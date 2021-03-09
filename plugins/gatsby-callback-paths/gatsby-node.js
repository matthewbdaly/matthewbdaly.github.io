exports.onCreateNode = (
  { actions, node },
  options
) => {
  const { type } = node.internal

  if (type !== ('MarkdownRemark')) return

  options.extract.forEach(({ name, callback }) => {
    const value = callback(node);

    if (value !== null && value !== node.fileAbsolutePath) {
      actions.createNodeField({
        node,
        name,
        value,
      })
    }
  })
}
