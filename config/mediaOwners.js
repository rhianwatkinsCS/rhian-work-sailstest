module.exports = {
  "candyspace": {
    ftp: {
      name:"candyspace",
      host: 'ftp.candyspace.com',
      user: process.env.CITIBANK_CS_USERNAME,
      password: process.env.CITIBANK_CS_PASSWORD,
      rootDir: ''
    }
  },
  "outfront": {
    ftp: {
      name:"outfront",
      host: 'ftp.candyspace.com',
      user: process.env.CITIBANK_OUTFRONTMEDIA_USERNAME,
      password: process.env.CITIBANK_OUTFRONTMEDIA_PASSWORD,
      rootDir: ''
    }
  },
  "cemusa": {
    ftp: {
      name:"cemusa",
      host: 'ftp.candyspace.com',
      user: process.env.CITIBANK_CEMUSA_USERNAME,
      password: process.env.CITIBANK_CEMUSA_PASSWORD,
      rootDir: ''
    }
  }
}