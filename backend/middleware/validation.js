const Joi = require('joi');

// User validation schemas
exports.registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    });
    
    return schema.validate(data);
};

exports.loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
    
    return schema.validate(data);
};

exports.updateProfileValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50),
        email: Joi.string().email(),
        bio: Joi.string().max(500),
        country: Joi.string(),
        favoriteCuisines: Joi.array().items(Joi.string())
    });
    
    return schema.validate(data);
};

// Recipe validation schemas
exports.recipeValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().max(100).required(),
        description: Joi.string().max(500).required(),
        cuisine: Joi.string().valid('Chinese', 'Japanese', 'Korean', 'Thai', 'Vietnamese', 'Indian', 'Malaysian', 'Indonesian', 'Filipino', 'Other').required(),
        category: Joi.string().valid('Appetizer', 'Main Course', 'Side Dish', 'Dessert', 'Soup', 'Noodles', 'Rice', 'Vegetarian', 'Non-Vegetarian').required(),
        difficulty: Joi.string().valid('Easy', 'Medium', 'Hard').required(),
        prepTime: Joi.number().min(1).required(),
        cookTime: Joi.number().min(1).required(),
        servings: Joi.number().min(1).required(),
        ingredients: Joi.array().items(Joi.object({
            name: Joi.string().required(),
            quantity: Joi.string().required(),
            unit: Joi.string()
        })).min(1).required(),
        instructions: Joi.array().items(Joi.object({
            step: Joi.number().required(),
            description: Joi.string().required()
        })).min(1).required(),
        image: Joi.string().uri(),
        tags: Joi.array().items(Joi.string()),
        isVegetarian: Joi.boolean(),
        isSpicy: Joi.boolean(),
        status: Joi.string().valid('draft', 'published', 'archived')
    });
    
    return schema.validate(data);
};