import { prisma } from "./prisma";

// prisma.page
//   .upsert({
//     where: {
//       title: "Wfp",
//     },
//     update: {
//       title: "Wfp",
//     },
//     create: {
//       title: "Wfp",
//     },
//   })
//   .then(() => {
//     return prisma.link.create({
//       data: {
//         from: {
//           connect: {
//             title: "Wfp",
//           },
//         },
//         to: {
//           connectOrCreate: {
//             where: {
//               title: "Wfp2",
//             },
//             create: {
//               title: "Wfp2",
//             },
//           },
//         },
//       },
//     });
//   });

// prisma.page.deleteMany({}).then(() => {
//   console.log("wfp");
// });

// prisma.page
//   .create({
//     data: {
//       title: "Wfp",
//       linksTo: {
//         connectOrCreate: {
//           where: {
//             title: "Wfp2",
//           },
//           create: {
//             title: "Wfp2",
//           },
//         },
//       },
//     },
//   })
//   .then(() => {
//     console.log("Done!");
//   });

prisma.page.findFirst({ where: { title: "april" } }).then((result) => {
  console.log(result);
});
