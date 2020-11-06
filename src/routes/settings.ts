import express from "express";

const router = express.Router();

router.get('/', (request, response) => {
  response.json({
    account: {
      number: "68 1140 2004 0000 3102 3436 1372",
      label: "eKonto - moje"
    },
    member: {
      firstname: "Olaf",
      lastname: "Gałązka"
    }
  });
});

export default router;

