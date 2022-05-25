import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const usersSchema = mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		token: {
			type: String,
		},
		confirmed: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

usersSchema.pre('save', async function (next) {
	try {
		if (!this.isModified('password')) {
			return next();
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(this.password, salt);
		this.password = hashedPassword;
		return next();
	} catch (error) {
		return error;
	}
});

usersSchema.methods.isValidPassword = async function (passwordForm) {
	try {
		return await bcrypt.compare(passwordForm, this.password);
	} catch (error) {
		return error;
	}
};

const Users = mongoose.model('Users', usersSchema, 'Users');
export default Users;
