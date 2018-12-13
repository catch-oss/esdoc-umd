# esdoc-umd

An esdoc module. Attempts to rewrite UMD style modules so esdoc can parse them.

An esdoc compatible docblock comment at the top of the file is required to render usage information in esdoc.

If the module is not being loaded by esdoc, ensure the end statement for the document is formatted as below:

`}));`
