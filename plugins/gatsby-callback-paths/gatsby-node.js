exports.onCreateNode = (
  { actions, node },
  options
) => {
  const { createNodeField } = actions

  options.extract.forEach(({ name, callback }) => {
    const value = callback(node);

    if (value !== null && value !== node.fileAbsolutePath && options.matchNodeType.includes(node.internal.type)) {
      createNodeField({
        node,
        name,
        value,
      })
    }
  })
}
