import mongoose from "mongoose";

type TImage = {
  fileName: string;
  originalName: string;
};

interface IProduct {
  title: string;
  image: TImage;
  category: string;
  description: string;
  price: number | null;
}

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 30,
  },

  image: {
    fileName: {
      type: String,
    },
    originalName: {
      type: String,
    },
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: null,
  },
});

export default mongoose.model<IProduct>("product", productSchema);
