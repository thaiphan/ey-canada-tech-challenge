# Fixer-Upper Bookings

To start the app run `make`. Requires `make`, `npm`, `npx`, and `docker-compose` to be installed.

# Essay

My process for identifying bugs in the app was:

1. Attempt to launch the app
2. Go to the homepage (http://localhost:3000) and interact with everything on that page to make sure that it worked, e.g. listing bookings, creating bookings, etc.
3. Attempt to create a booking from the app (http://localhost:3000/add)
4. Review the backend and see if I could make any improvements given the requirements detailed in the PDF

The most pressing issue that I identified was that the homepage was re-rendering in an infinite loop. This was because caused because an axios fetch call was being invoked at the root level of the homepage component. You need to wrap the axios call in a useEffect Hook to prevent that.

I noticed that the app was very CRUD-oriented, e.g. listing bookings, deleting bookings, creating bookings, etc. However, the data fetching for the app was very bespoke -- it was simply using axios / fetch calls everywhere with no thought for reusability. Things like loading state and error state seemed to be managed manually. There are now libraries available now that abstract data fetching in a nice way. Some of these libraries include swr, react-query and Redux Toolkit Query. These libraries will fetch, cache and handle different states like errors and loading states. Rather than update each custom axios call individually, I migrated over to using Redux Toolkit Query. I was able to delete a lot of code as a result.

When you delete a booking, the page did not automatically refresh with the updated bookings. As part of upgrading to Redux Toolkit Query, I was able to quickly set up cache invalidation so deleting and add bookings updated the list of bookings without needing to Ctrl + R. Since we no longer needed hard refreshes, I replaced the non-standard a tags and onClick events with React-Router Link components for buttery smooth transitions.

I didn't add in error states or loading states as part of this exercise but it's quite possible and easy using RTK Query or any other library.

Forms in the app were also bespoke. There are popular form management libraries like Formik and react-hook-form that handle validation and submissions and the different states. I didn't have time to migrate to a form management library but that's something that I normally do straightaway to increase developer velocity. There was one bug where even though the form has failed validation, we were still submitting that form to the backend. This would've been automatically handled if we used a popular library but, in this case, I manually fixed it.

The app is not very accessible or mobile friendly. Keyboard-only users would not be able to use this app. In Canada, accessibility is very important so updating the app to support this functionality is a high priority.

There was a requirement in the PDF that the locations need to be dynamic. We might add additional locations in the future. To support this use case, I created a database table and an API endpoint where users can fetch all the locations. I swapped out the hardcoded dropdown in the frontend with this dynamic data. I didn't update the location column in the bookings table to be a foreign key and that's something I'd do if I had more time.

I updated the APIs to be a bit more RESTful. I switched to use proper HTTP method names, e.g. DELETE, and I renamed the endpoints so they represented a noun rather than a verb. If I had more time, I would've improved the error handling. HTTP status code isn't very accurate.

The POST bookings endpoint had some weird code where we iterated through UUIDs until we found a unique one. I believe this was an attempt to avoid a potential API error response. However, UUIDv4 (which is the function we're using) is meant to be very unlikely to cause conflicts. I would normally have a discussion with stakeholders first but I'm personally happy for this kind of failure as the user can just re-submit or we can use RTK Query to auto-matically resubmit for us. I created a database migration so that PostgreSQL automatically generates the UUID for us -- reducing the amount of code.

Speaking of PostgreSQL, that database schema isn't the best. The app uses a mixture of integers and UUIDs for the "id" column. The createdData and bookingData columns should be DATE. If I had more time, I would write a database migration to fix these issues. The data type is also TEXT instead of UUID. However, from the interview so far, uptime seems to be important so it's important to discuss strategies with stakeholders and get sign off from everything. Easiest is to take the website offline and perform maintenance. The ID field seems to be very internal so we could possibility create a new ID with new UUIDs and migrate to that (which would involve removing the PRIMARY KEY constraint from id). A follow up migration could clean up the vestigial column.

Instead of writing direct database queries, I would've used an ORM like Prisma or Sequelize. ORMS automate so much stuff like security and migrations and rollbacks.

I would switch to using environment variables. I did it partially for the frontend app to show that it could be done.
