import { Schema, model } from "mongoose";

const LoanSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },

    loanDate: {
      type: Date,
      default: Date.now
    },

    dueDate: {
      type: Date,
      required: true
    },

    returnDate: {
      type: Date,
      default: null
    },

    status: {
      type: String,
      enum: ["ACTIVE", "RETURNED"],
      default: "ACTIVE"
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model("Loan", LoanSchema);