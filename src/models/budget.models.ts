// import { IBudget } from "../utils/budget.utils";

// export interface IBudget extends Document {
//     user_id: mongoose.Types.ObjectId;
//     category: string;
//     monthly_limit: number;
//     spent: number;
//     date: Date;

//   }

// const BudgetSchema = new Schema<IBudget>({
//     user_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,

//     category: {
//       type: String,
//       required: true,
//       enum: [
//         'groceries',
//         'entertainment',
//         'transport',
//         'utilities',
//         'dining',
//         'health',
//         'others',
//       ],
//       trim: true,
//     },
//     monthly_limit: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     spent: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//     updatedAt: {
//       type: Date,
//     },
//   });
