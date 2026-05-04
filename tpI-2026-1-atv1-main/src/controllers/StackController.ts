import { Request, Response } from "express";
import { stack } from "../models/instances";

export class StackController {
  public add(req: Request, res: Response): void {
    const { item } = req.body;

    if (item === undefined) {
      res.status(400).json({ erro: "Informe o campo 'item' no corpo da requisição." });
      return;
    }

    stack.add(item);
    res.status(201).json({ mensagem: "Item adicionado na pilha." });
  }

  public remove(_req: Request, res: Response): void {
    const removed = stack.remove();

    if (removed === undefined) {
      res.status(404).json({ erro: "A pilha está vazia." });
      return;
    }

    res.json({ removido: removed });
  }

  public peek(_req: Request, res: Response): void {
    const top = stack.peek();

    if (top === undefined) {
      res.status(404).json({ erro: "A pilha está vazia." });
      return;
    }

    res.json({ topo: top });
  }

  public getAll(_req: Request, res: Response): void {
    res.json({
      estrutura: {
        id: stack.getId(),
        name: stack.name,
      },
      tamanho: stack.getSize(),
      itens: stack.getItems(),
    });
  }

  public clear(_req: Request, res: Response): void {
    stack.clear();
    res.json({ mensagem: "Pilha limpa com sucesso." });
  }
}
