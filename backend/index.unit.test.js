
const userModel = require("./models");

const find = require("./index")

describe("Finding User",() => {
    it.only('Should Find', async()=>{

        find.findOne =  jest.fn().mockReturnValueOnce({
            id: 234
        })

        userModel.prototype.save = jest.fn().mockImplementation(() => {})
        await expect(find(""))

    })

       


})
