const express = require("express");
const router = express.Router();
const Model = require("../models/model");

// Rota POST: criar um documento no banco de dados
router.post("/post", async (req, res) => {
	const { name, age } = req.body;

	if (!name || !age) {
		return res
			.status(400)
			.json({ message: "Nome e idade são obrigatórios" });
	}

	const data = new Model({ name, age });

	try {
		const dataToSave = await data.save();
		res.status(201).json(dataToSave);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Rota GET ALL: retorna todos os elementos do banco de dados
router.get("/getAll", async (req, res) => {
	try {
		const data = await Model.find();
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Rota GET ONE: retorna um elemento de acordo com um elemento específico
router.get("/getOne/:name", async (req, res) => {
	const { name } = req.params;

	if (!name) {
		return res.status(400).json({ message: "Nome é obrigatório" });
	}

	try {
		const data = await Model.findOne({
			name: { $regex: name, $options: "i" },
		});
		if (!data) {
			return res
				.status(404)
				.json({ message: "Nenhum registro encontrado" });
		}
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//rota update -> atualizar um documento no banco de dados
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        // Opção para retornar o novo documento após a atualização
        const options = { new: true , strict: false};

        // Atualizar o documento
        const result = await Model.findByIdAndUpdate(id, updatedData, options);

        // Verificar se o documento foi encontrado e atualizado
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Documento não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//rota delete -> apagar um documento no banco de dados
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        // Deletar o documento
        const result = await Model.findByIdAndDelete(id);

        // Verificar se o documento foi encontrado e deletado
        if (result) {
            res.status(200).json({ message: 'Documento deletado com sucesso' });
        } else {
            res.status(404).json({ message: 'Documento não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// // Rota UPDATE: atualizar um documento no banco de dados
// router.put("/update/:id", async (req, res) => {
// 	const { id } = req.params;
// 	const { name, age } = req.body;

// 	if (!id) {
// 		return res.status(400).json({ message: "ID é obrigatório" });
// 	}

// 	try {
// 		const data = await Model.findByIdAndUpdate(
// 			id,
// 			{ name, age },
// 			{ new: true }
// 		);
// 		if (!data) {
// 			return res
// 				.status(404)
// 				.json({ message: "Nenhum registro encontrado" });
// 		}
// 		res.status(200).json(data);
// 	} catch (error) {
// 		res.status(400).json({ message: error.message });
// 	}
// });

// // Rota DELETE: apagar um documento no banco de dados
// router.delete("/delete/:id", async (req, res) => {
// 	const { id } = req.params;

// 	if (!id) {
// 		return res.status(400).json({ message: "ID é obrigatório" });
// 	}

// 	try {
// 		const data = await Model.findByIdAndDelete(id);
// 		if (!data) {
// 			return res
// 				.status(404)
// 				.json({ message: "Nenhum registro encontrado" });
// 		}
// 		res.status(200).json({ message: "Registro deletado com sucesso" });
// 	} catch (error) {
// 		res.status(400).json({ message: error.message });
// 	}
// });

module.exports = router;
