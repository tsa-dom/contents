const { mdToHtml } = require("../scripts/generate")
const { about, post } = require("./data")

jest.mock('../tmp/groups.json', () => require('./groups.json'), { virtual: true })
jest.mock('../tmp/pages.json', () => require('./pages.json'), { virtual: true })

describe("Generate test", () => {

  // This test may fail after changes to about.md
  // Should be replaced later
  it("page file is generated correctly", async () => {
    const result = await mdToHtml('./pages/about.md')
    expect(result).toEqual(about)
  })

  it('post file is generated correctly', async () => {
    const result = await mdToHtml('./articles/test/test.md')
    expect(result).toEqual(post)
  })

})