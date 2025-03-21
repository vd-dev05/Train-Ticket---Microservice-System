const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

module.exports = {

    /**
     * @param {string} password
     * @returns {Promise<string>}
     * 
     */
    hashPassword: async (password) => {
        try {
            const salt = await bcrypt.genSalt(SALT_ROUNDS);
            const hashedPassword = await bcrypt.hash(password, salt);
            return hashedPassword;
        } catch (error) {
            throw new Error("Error hashing password");
        }
    },
    /**
     * Compares the input password with the hashed password
     * @param {string} password - The input password
     * @param {string} hashedPassword - The stored hashed password
     * @returns {Promise<boolean>} - The comparison result (true if matches, false if not)
     */
    comparePassword: async (password, hashedPassword) => {
        try {
            return await bcrypt.compare(password, hashedPassword);
        } catch (error) {
            throw new Error('Password mismatch');
        }
    }
}