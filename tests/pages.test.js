process.argv.push('./articles/test/test.md', true)
const { getData, generateContent, generateHtml } = require("../scripts/pages")
const { expectedContent, generatedHtml } = require("./data")

jest.mock('../scripts/dump', () => ({
  dumpPages: jest.fn(),
  dumpBlog: jest.fn()
}))
jest.mock('../scripts/generate', () => ({
  mdToHtml: () => 'this works pretty well'
}))

let writeCalls = []
jest.mock('fs', () => ({
  promises: {
    ...jest.requireActual('fs').promises,
    writeFile: (e, f) => writeCalls.push([e, f])
  }
}))

beforeEach(() => {
  writeCalls.length = 0
})

const expectedData = {
  path: './articles/test/test.md',
  file: 'test/test',
  title: 'This is something very interesting',
  description: 'Lets try if the script can access this',
  group: undefined,
  name: undefined,
  priority: undefined,
  author: 'Tapio Salonen',
  keywords: 'Test'
}

describe("Pages test", () => {

  it("correct data is returned", async () => {
    const data = await getData('articles')
    expect(data).toEqual(expectedData)
  })

  it("correct page content is generated", async () => {
    const content = await generateContent(expectedData)
    expect(content).toEqual(expectedContent)
  })

  it("empty string is generated if no data given", async () => {
    const content = await generateContent(undefined)
    expect(content).toEqual('')
  })

  it("correct html is generated from the content", async () => {
    await generateHtml('articles', 'blog')
    expect(generatedHtml.replace(/\s\s+/g, ' ')).toEqual(writeCalls[0][1].replace(/\s\s+/g, ' '))
  })

})