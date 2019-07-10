# MDWiki

local markdown reader and writer

### development

Create a directory called "pages" in the project root folder for the backend to store page files

Run `docker-compose up --build` to run the development environment

To get a shell in a container run `docker-compose exec {frontend/backend} sh`

### TODO

- [x] clicking menu loads content and selects menuitem
- [ ] saving loaded content patches existing content
- [ ] automatically load content from the last session
- [x] make pages folder map to host folder in backend dockerfile
- [ ] auto close menu on click
- [x] clicking checkbox in preview updates editor
- [ ] store last updated time and order menu by it
- [ ] editor style and tools
- [ ] autosave
- [ ] kb shortcuts
- [ ] style and polish
