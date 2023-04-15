import { Users } from "../models/User.js";

export async function findLocation(data) {
  let { phonNumber, lat, long } = data;

  if (!phonNumber) {
    return {
      status: "error",
      message: "phonNumber and  is not coming ",
    };
  } else {
    try {
      let user = await Users.findOne({ phonNumber });
      if (!user) {
        return {
          status: "error",
          message: "This User Not Exist In Our Data Base",
        };
      } else {
        //updating location of schemaa
        user.Location.lat =lat;
        user.Location.long =long ;
        await user.save();

        return user;
      }

      //  return user;
    } catch (e) {
      throw new Error("Location is Not Find in geolocation ", e);
    }
  }
}




