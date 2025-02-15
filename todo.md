# **Still TO DO:**

#### Filter on ResourceListings.jsx

* [X] Fix filter: make it work.
* [X] Fix filter: margins on x axis, fit with resources.

#### Add Resources Route /add-resources

* [X] Add resources: if not signed in, redirect to login page
* [X] Edit resources: the same
* [X] addResources button: homecards and navbar
* [X] Protect addResource, editResource, and my Resources in App

### Card Change

* [X] Redesign resource listing, show user who posted it by showing a little picture icon of the person who owns the resource

#### Add / Edit Page

* [X] Add optional and required fields (add)
* [X] Add optional and required fields (edit)
* [ ] Change * to html entity
* [ ] Change ' to html entity in my resources
* [X] Check if user matches resource user id before deleting

#### Mobile

* [X] Fix scroll
* [X] fix nav (dasiyui?) yes
* [X] fix filter
* [X] single resource listing is UGLAYYY, FIX IT!!! and make it responsive

#### Login

* [X] Now that it's deployed, sign in isnt working. fix.

#### Legacy Resources

* [X] Import existing posts to Jj's account****

#### Misc

* [ ] Get new fav icon
* [X] my resources, truncate text to 90 characters like on homepage (reused ResourceListing component for this)
* [X] anims for certain elements
* [ ] pagination for my resources (24 per page)
* [X] pagination working with filter on resource page
* [ ] push items under line is resourcelisting to be on the bottom no matter what

#### Hosting

* [X] Change ALL links for localhost:5000
* [X] Change ALL links for localhost:4444
* [X] Change .env in backend and frontend -> VITE_API_URL and VITE_BASE_URL and PORT (backend)
* [X] Hosting backend separately or no ????? probably. YES
* [X] Change servers, render too slow on free tier
* [X] Fix uri mismatch even though they are matched ??

### FUTURE UPDATES:

People can create lists (like GitHub w/ stars, create a list and add resources to a list)

make lists shareable

change categories to tags so you can select (on filter) multiple, and resources can have multiple categories

Resources can be public or private

* [X] fix filter to work with pagination

Profiles: click icon to view someone's public profile (will only show public resources and lists)

Add more resource types: Article,

Implement character limits on form for each category.

Add more categories: Documentation

Redirect loading back to homepage (rn its success = true), using AuthContext

read for duplicates, resource already exists something like that

Button to Add and Edit resource, rounded. MyResourcesPage -> Add First Resource button: make consistent with all the rest.

Local passport integration

Remove all console logs.

When deleting a resource, instead of taking you back to '/resources', it should take you back to where you were last browsing (eg. page 2, in the middle of the page is where you should be redirected to)

After adding a resource, when it redirects you to /resources, the filters should stay on until you reset them.

Add tags: free, or paid. tiers: `$, $$, $$$`

### ERRORS OR FUTURE FIXES

* [ ] aos interfering with hover on resourcelisting
* [ ] Protect edit resource in the backend (having trouble)
* [X] might be more useful to see the user who uploaded it, and maybe have the creator of the resource showing somewhere smaller

▸ 📂 convex         # Backend queries, mutations, and schema definitions
▸ 📂 public         # Images, favicons, and other unprocessed assets
▾ 📂 src            # Frontend application
▾ 📂 components   # Shared components
▸ 📂 app        # App-related global components (logos, sidebar, etc.)
▸ 📂 common     # Design system components from React Aria
▸ 📂 quests     # Feature-specific quest components
▸ 📂 routes       # File-based routing using TanStack Router
▸ 📂 styles       # Global CSS (not much here; most of it's in Tailwind!)
📄 main.tsx     # Base of the project including common Providers
▸ 📂 tests          # End-to-end Playwright tests
