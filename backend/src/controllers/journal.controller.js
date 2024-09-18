import { Journal } from "../models/journal.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createJournal = asyncHandler( async (req, res) => {
    const { title, jEntries } = req.body;

    if ([title, jEntries].some(field => typeof field === 'string' && field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
      }

    jEntries.forEach(entry => {
        if (!entry.chapter || !entry.content) {
          return res.status(400).json({ message: 'Invalid journal entry! Chapter and/or content is/are required.' });
        }
      });

    const existingJournal = await Journal.findOne({ title, user: req.user._id });

    if (existingJournal){
        existingJournal.jEntries.push(...jEntries);

        await existingJournal.save();
        const updatedJournal = await Journal.findById(existingJournal._id).select("-user");
        return res.status(200).json(new ApiResponse(200, updatedJournal, "Journal updated successfully"));
    }

    else{
        const newJournal = await Journal.create({
            title,
            jEntries,
            user: req.user._id
        })

        const createdJournal = await Journal.findById(newJournal._id).select("-user");

        if(!createdJournal){
            throw new ApiError(500, "Something went wrong while creating journal")
        }

        return res
        .status(201)
        .json(
            new ApiResponse(201, createdJournal, "Journal created successfully")
        )
    }
})

const FindAllJournals = asyncHandler( async (req, res) => {

    const journals = await Journal.find({ user: req.user._id }).select("-user");
    
    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            journals, 
            "Journals retrieved successfully"
        )
    );
})

const deleteJournal = asyncHandler( async (req, res) => {
    const { title } = req.body;

    if (!title) {
        throw new ApiError(400, "Journal title is required");
    }

    const journal = await Journal.findOne({ title, user: req.user._id });

    if (!journal) {
        return res.status(404).json({ message: 'Journal not found' });
    }

    await journal.deleteOne({ _id: journal._id });

    return res
    .status(200)
    .json(
        {
            message: 'Journal deleted successfully' 
        }
    );
})

const updateJournal = asyncHandler(async (req, res) => {
    const { title, updatedTitle, updatedjEntries } = req.body;
  
    if (!title) {
      throw new ApiError(400, "Journal title is required");
    }
  
    const journal = await Journal.findOne({ title, user: req.user._id });
  
    if (!journal){
      return res
      .status(404)
      .json(
        {
            message: 'Journal not found' 
        }
      );
    }
  
    if (updatedTitle) {
      journal.title = updatedTitle;
    }
  
    if (updatedjEntries) {
      updatedjEntries.forEach(updatedEntry => {
        const existingEntryIndex = journal.jEntries.findIndex(entry => entry._id.toString() === updatedEntry._id);
  
        if (existingEntryIndex !== -1) {
          journal.jEntries[existingEntryIndex] = {
            ...journal.jEntries[existingEntryIndex],
            ...updatedEntry
          };
        } else {
          journal.jEntries.push(updatedEntry);
        }
      });
    }
  
    const updatedJournal = await journal.save();
  
    if (!updatedJournal) {
      throw new ApiError(500, "Failed to update journal, try again later");
    }
  
    return res
    .status(200)
    .json(
      new ApiResponse(
        200, 
        updatedJournal, 
        "Journal updated successfully"
      )
    );
});


export {
    createJournal,
    FindAllJournals,
    deleteJournal,
    updateJournal
}