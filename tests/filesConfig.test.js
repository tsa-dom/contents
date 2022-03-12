const { getPaths } = require('../scripts/fileConfigs')
const { blogTreeResult, blogTree } = require('./data')

describe("File configurations", () => {
  
  it("correct configurations are generated", () => {
    const files = []
    getPaths(blogTree, files)
    expect(files).toEqual(blogTreeResult)
  })

})