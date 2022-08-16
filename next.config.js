// import getDb from "./db.js";

module.exports = {
  images: {
    domains: ["picsum.photos"],
  },
};

// module.exports = {
//   async headers() {
//     const db = await getDb();
//     const [nbCampus] = Object.values(
//       db.prepare("SELECT count(*) from campus").get()
//     );

//     return [
//       {
//         source: "/api/campuses",
//         headers: [
//           {
//             key: "x-total-count",
//             value: nbCampus,
//           },
//         ],
//       },
//     ];
//   },
// };
