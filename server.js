import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.get("/usuarios", async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
});

app.post("/usuarios", async (req, res) => {
  if (!req.body.email || !req.body.nome || req.body.ativo === undefined) {
    return res.status(400).json({ error: "Há campos não preenchidos" });
  }
  try {
    await prisma.user.create({
      data: {
        email: req.body.email,
        nome: req.body.nome,
        ativo: req.body.ativo,
        disciplinas: req.body.disciplinas,
      },
    });
    res.status(201).json(req.body);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário.", details: error.message });
  }
});

app.put("/usuarios/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      nome: req.body.nome,
      ativo: req.body.ativo,
      disciplinas: req.body.disciplinas,
    },
  });
  res.status(201).json(req.body);
});

app.delete("/usuarios/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({message: "Usuário deletado com sucesso!"})
});

app.listen(3000);
