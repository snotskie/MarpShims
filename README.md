# MarpShims

A collection of quick shims I use often in Marp projects:

- Automatic page breaks
- Automatic dark/light theme
- Automatic table of contents
- Automatic hyperlinked headings
- Automatic scrolling to the correct slide on load
- ...

## Usage

```html
    <script type="text/javascript" src="https://snotskie.github.io/MarpShims/MarpShims.js"></script>
    <script type="text/javascript">
      window.addEventListener("load", () => {
        MarpShims.load({
          // headings_query: "h1",
          // toc_id: "toc"
        });
      });
    </script>
```

## CSS Classes

