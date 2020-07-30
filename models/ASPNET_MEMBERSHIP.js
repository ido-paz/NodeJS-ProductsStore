let crypto = require('crypto');
//let usersDB = require('./UserDB_MSSQL');
//
exports.module =  class ASPNET_Membership
 {
     constructor(){         
     }

     login(email, clearPassword)
     {
        //  let passwordData = await usersDB.getPasswordData(email);
        //  const key = crypto.pbkdf2Sync(clearPassword, passwordData.salt,
        //                                0,passwordData.salt.length, 'sha1');
         //
        //  if (dataSet != null)
        //  {
        //      DataRow dr = dataSet.Tables[0].Rows[0];
        //      hashedPassword = dr["Password"].ToString();
        //      encodedPassword = GetEncodePassword(clearPassword, 1, dr["PasswordSalt"].ToString());
        //      if (hashedPassword == encodedPassword)
        //          return true;                
        //  }
         return false;
     }
     /// <summary>
     /// Based on 
     /// https://stackoverflow.com/questions/36945889/what-hash-algorithm-used-by-the-asp-net-membership#36945976
     /// </summary>
     /// <param name="password"></param>
     /// <param name="passwordFormat"></param>
     /// <param name="salt"></param>
     /// <returns></returns>
     //
    //  static GetEncodePassword(password, salt)
    //  {
    //     byte[] bIn = Encoding.Unicode.GetBytes(password);
    //     byte[] bSalt = Convert.FromBase64String(salt);
    //     byte[] bRet = null;

    //     // MembershipPasswordFormat.Hashed 
    //     HashAlgorithm hm =SHA1.Create();// GetHashAlgorithm();
    //     if (hm is KeyedHashAlgorithm)
    //     {
    //         KeyedHashAlgorithm kha = (KeyedHashAlgorithm)hm;
    //         if (kha.Key.Length == bSalt.Length)
    //         {
    //             kha.Key = bSalt;
    //         }
    //         else if (kha.Key.Length < bSalt.Length)
    //         {
    //             byte[] bKey = new byte[kha.Key.Length];
    //             Buffer.BlockCopy(bSalt, 0, bKey, 0, bKey.Length);
    //             kha.Key = bKey;
    //         }
    //         else
    //         {
    //             byte[] bKey = new byte[kha.Key.Length];
    //             for (int iter = 0; iter < bKey.Length;)
    //             {
    //                 int len = Math.Min(bSalt.Length, bKey.Length - iter);
    //                 Buffer.BlockCopy(bSalt, 0, bKey, iter, len);
    //                 iter += len;
    //             }
    //             kha.Key = bKey;
    //         }
    //         bRet = kha.ComputeHash(bIn);
    //     }
    //     else
    //     {
    //         byte[] bAll = new byte[bSalt.Length + bIn.Length];
    //         Buffer.BlockCopy(bSalt, 0, bAll, 0, bSalt.Length);
    //         Buffer.BlockCopy(bIn, 0, bAll, bSalt.Length, bIn.Length);
    //         bRet = hm.ComputeHash(bAll);
    //     }         
    //      return Convert.ToBase64String(bRet);
    //  }
 }