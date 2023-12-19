// controllers/colocationController.js
import models from '../models/index.js';

export const getColocations = async (req, res) => {
  try {
    const data = await models.colocation.findAll({
      include: [
        'users',
        {
          model: models.objective,
          as: 'objectives',
          include: ['task', 'outgoing'],
        },
        'admin_user',
      ],
    });
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createColocation = async (req, res) => {
  const { name, admin_user_id } = req.body;
  
  try {
    const colocation = await models.colocation.create({
      name,
      admin_user_id,
    });

    res.status(201).json({ colocation });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getColocationById = async (req, res) => {
  const { id } = req.params;

  try {
    const colocation = await models.colocation.findByPk(id, {
      include: [
        'users',
        {
          model: models.objective,
          as: 'objectives',
          include: ['task', 'outgoing'],
        },
        'admin_user',
      ],
    });

    if (colocation) {
      res.json({ colocation });
    } else {
      res.status(404).json({ error: 'Colocation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getColocationByAdmin = async (req, res) => {
  const { adminUserId } = req.params;

  try {
    const colocation = await models.colocation.findOne({
      where: { admin_user_id: adminUserId },
      include: [
        'users',
        {
          model: models.objective,
          as: 'objectives',
          include: ['task', 'outgoing'],
        },
        'admin_user',
      ],
    });

    if (colocation) {
      res.json({ colocation });
    } else {
      res.status(404).json({ error: 'Colocation not found for admin user' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const updateColocationAdmin = async (req, res) => {
  const { id } = req.params;
  const { admin_user_id } = req.body;

  try {
    const colocation = await models.colocation.findByPk(id);

    if (colocation) {
      await colocation.update({ admin_user_id });
      res.json({ colocation });
    } else {
      res.status(404).json({ error: 'Colocation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// A tester 
export const addColocationMember = async (req, res) => {
    const colocation_id = req.params;
    const { user_id } = req.body;

    try {
        const user = await models.user.findByPk(user_id);
    
        if (user) {
          await user.update({colocation_id });
          res.json({ user });
        } else {
          res.status(404).json({ error: 'Colocation not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
