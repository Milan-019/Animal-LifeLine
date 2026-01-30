require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const createAdmin = async () => {
    try {
        console.log('Connecting to database...');
        await mongoose.connect(process.env.MONGO_URI);

        const email = 'admin@example.com';
        const password = 'Password@123';

        let user = await User.findOne({ email });

        if (user) {
            user.role = 'Admin';
            user.isEmailConfirmed = true;
            // Reset password just in case
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();
            console.log('Existing admin user updated.');
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user = new User({
                name: 'System Admin',
                email,
                password: hashedPassword,
                role: 'Admin',
                isEmailConfirmed: true
            });
            await user.save();
            console.log('New Admin user created.');
        }

        console.log('-----------------------------------');
        console.log('Admin Credentials:');
        console.log(`Email:    ${email}`);
        console.log(`Password: ${password}`);
        console.log('-----------------------------------');
        process.exit();
    } catch (err) {
        console.error('Error creating admin:', err);
        process.exit(1);
    }
};

createAdmin();
