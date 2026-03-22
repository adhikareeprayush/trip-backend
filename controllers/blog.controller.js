import { Blog } from "../models/blog.model";

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();

    if (blogs.length === 0) {
      res.status(404).json({
        message: "No blogs found",
      });
    }

    res.status(200).json(blogs);
  } catch (error) {}
};

// Create a new blog
export const addBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      excerpt,
      bannerUrl,
      authorId,
      isPublished,
      publishedDate,
    } = req.body;

    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    if (!title || !content || !excerpt || !bannerUrl || !authorId) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newBlog = new Blog({
      title,
      content,
      excerpt,
      bannerUrl,
      slug,
      authorId,
      isPublished: isPublished || false,
      publishedDate: isPublished ? publishedDate || new Date() : null,
    });

    await newBlog.save();

    res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating blog",
    });
  }
};

// Update a blog
export const updateBlog = async (req, res) => {
  try {
    const { title, content, excerpt, bannerUrl, isPublished, publishedDate } =
      req.body;
    const { id } = req.params;

    const existingBlog = await Blog.findById(id);

    if (!existingBlog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    existingBlog.title = title || existingBlog.title;
    existingBlog.content = content || existingBlog.content;
    existingBlog.excerpt = excerpt || existingBlog.excerpt;
    existingBlog.bannerUrl = bannerUrl || existingBlog.bannerUrl;
    existingBlog.isPublished =
      isPublished !== undefined ? isPublished : existingBlog.isPublished;
    existingBlog.publishedDate = isPublished
      ? publishedDate || new Date()
      : null;

    await existingBlog.save();
    res.status(200).json({
      message: "Blog updated successfully",
      blog: existingBlog,
    });
  } catch (error) {}
};

// Delete a blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const existingBlog = await Blog.findById(id);

    if (!existingBlog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    await Blog.findByIdAndDelete(id);

    res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting blog",
    });
  }
};
