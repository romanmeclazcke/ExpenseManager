import { Request, Response } from "express";
import SavingGoals from "../models/savingsGoalsModel";
import { calculatePercentage } from "../utils/calculatePercentaje";

class SavingGoalsController {
  async getSavingGoals(req: Request, res: Response) {
    try {
      const dataUser = req.session.user;

      if (!dataUser || !dataUser.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const goals = await SavingGoals.findAll({
        where: {
          idUser: dataUser.id,
        },
      });

      const goalsResult = await Promise.all(
        goals.map(async (goal) => {
          const result = {
            id: goal.id,
            idUser: goal.idUser,
            name: goal.name,
            endDate: goal.endDate,
            ultimateGoal: goal.ultimateGoal,
            currentAmount: goal.currentAmount,
            progressPercentage: await calculatePercentage(
              goal.ultimateGoal,
              goal.currentAmount
            ),
          };
          return result;
        })
      );

      goalsResult
        ? res.status(200).json({ message: goalsResult, details: true })
        : res
            .status(404)
            .json({ message: "the user has no goals", details: false });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", details: false });
    }
  }

  async getSavingGoalsById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dataUser = req.session.user;

      if (!dataUser || !dataUser.id) {
        return;
      }

      const goal = await SavingGoals.findAll({
        where: { id: id, idUser: dataUser.id },
      });

      const goalsResult = await Promise.all(
        goal.map(async (goal) => {
          const result = {
            id: goal.id,
            idUser: goal.idUser,
            name: goal.name,
            endDate: goal.endDate,
            ultimateGoal: goal.ultimateGoal,
            currentAmount: goal.currentAmount,
            progressPercentage: await calculatePercentage(
              goal.ultimateGoal,
              goal.currentAmount
            ),
          };
          return result;
        })
      );

      goalsResult
        ? res.status(200).json({ message: goalsResult, details: true })
        : res.status(404).json({ message: "income not found", detials: false });
    } catch (error) {
      res
        .status(400)
        .json({ message: "internal server error", detials: false });
    }
  }

  async createSavingGoal(req: Request, res: Response) {
    try {
      const { name, endDate, ultimateGoal } = req.body;
      const dataUser = req.session.user;

      if (!dataUser || !dataUser.id) {
        return;
      }

      const data = {
        idUser: dataUser.id,
        name,
        endDate,
        ultimateGoal,
      };
      const created = await SavingGoals.create(data);

      created
        ? res.status(200).json({ message: "goals created", details: true })
        : res
            .status(500)
            .json({ message: "internal server error", details: false });
    } catch (error) {
      res
        .status(500)
        .json({ message: "internal server error", detials: false });
    }
  }

  async deleteSavingGoal(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dataUser = req.session.user;

      if (!dataUser || !dataUser.id) {
        return;
      }

      const canDelete = await SavingGoals.destroy({
        where: { id: id, idUser: dataUser.id },
      });

      canDelete
        ? res.status(200).json({ message: "goal deleted", details: true })
        : res.status(404).json({ message: "goal not found", details: false });
    } catch (error) {
      res
        .status(500)
        .json({ message: "internal server error", detials: false });
    }
  }

  async editSavingGoal(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, endDate, ultimateGoal, currentAmount } = req.body;
      const dataUser = req.session.user;

      if (!dataUser || !dataUser.id) {
        return;
      }

      const updated = await SavingGoals.update(
        { name:name, 
          endDate:endDate, 
          ultimateGoal:ultimateGoal, 
          currentAmount:currentAmount 
        },
        {
          where: {
            id: id,
            idUser: dataUser.id,
          },
        }
      );

      updated
        ? res
            .status(200)
            .json({ message: "goal edit successfully", detials: true })
        : res
            .status(404)
            .json({ message: "goal not fount", detials: false });
    } catch (error) {
      res
        .status(400)
        .json({ message: "internal server error", detials: false });
    }
  }
}


export default SavingGoalsController;