let crypto = require('crypto');
//
module.exports = class ASPNET_Membership
 {
    //
    getBase64String(text){
        //const data = Buffer.from(text).toString('base64')
        const data =Buffer.from(text, 'base64').toString()
        return Uint8Array.from(data, b => b.charCodeAt(0));
    }
    //
    getPaddedUnicodeBytes(text){
        let byteCodes = [...text].map((item)=> item.charCodeAt(0));
        let paddedByteCodes =[];
        for (let index = 0; index < byteCodes.length; index++) {
            paddedByteCodes.push(byteCodes[index]);
            paddedByteCodes.push(0);
        }
        return paddedByteCodes;
    }
    /// <summary>
    /// Based on https://stackoverflow.com/questions/25745974/how-to-check-asp-net-password-hash-in-node-js/39409883
    /// </summary>
    getSHA1Hash(clearPassword, salt)
    {
        var bytes = new Buffer(clearPassword || '', 'utf16le');
        var src = new Buffer(salt || '', 'base64');
        var dst = new Buffer(src.length + bytes.length);
        src.copy(dst, 0, 0, src.length);
        bytes.copy(dst, src.length, 0, bytes.length);

        return crypto.createHash('sha1').update(dst).digest('base64');
    }
 } 