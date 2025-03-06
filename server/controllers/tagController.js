const { Tag } = require('../models/models');

class TagController {
  // Получить все теги
  async getAllTags(req, res) {
    try {
      const tags = await Tag.findAll();
      res.json(tags);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Получить тег по ID
  async getTagById(req, res) {
    try {
      const tag = await Tag.findByPk(req.params.id);
      if (tag) {
        res.json(tag);
      } else {
        res.status(404).json({ error: 'Tag not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Создать новый тег
  async createTag(req, res) {
    try {
      const tag = await Tag.create(req.body);
      res.status(201).json(tag);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Обновить тег
  async updateTag(req, res) {
    try {
      const [updated] = await Tag.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedTag = await Tag.findByPk(req.params.id);
        res.json(updatedTag);
      } else {
        res.status(404).json({ error: 'Tag not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Удалить тег
  async deleteTag(req, res) {
    try {
      const deleted = await Tag.destroy({
        where: { id: req.params.id },
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Tag not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TagController();