### Notes App Client Side

# Notes App Client

This is the client side of the Notes App, built with React and TypeScript. It allows users to create, edit, and delete notes, and features a WYSIWYG editor, toasts for notifications, and modals for user interactions.

## Installation

1. **Install Dependencies**: Run `npm install` to install the required dependencies.
2. **Start the Development Server**: Run `npm start` to start the development server.
3. **Build for Production**: Run `npm run build` to create a production build.

## Usage

- **Add Note**: Click the "Add Note" button to open the add note modal.
- **Edit Note**: Click the edit button (pen icon) on a note card to open the edit note modal.
- **Delete Note**: Click the delete button (trash icon) on a note card to open the delete confirmation modal.

### App Component
The `App` component is the main container for the application. It manages state for notes, modals, and loading status, and handles CRUD operations via fetch API calls.

- **State Management**: Uses React's `useState` and `useEffect` hooks.
  - `selectedNote`: Tracks the currently selected note for editing.
  - `notes`: Stores the list of notes fetched from the server.
  - `isModalOpen`: Controls the visibility of the add/edit modal.
  - `isEditing`: Determines if the modal is in add or edit mode.
  - `isDeleteModalOpen`: Controls the visibility of the delete confirmation modal.
  - `noteToDelete`: Tracks the note selected for deletion.
  - `isLoading`: Indicates if a note is currently being added to prevent multiple submissions.

- **Effect Hook**: Fetches notes from the server when the component mounts.

- **Event Handlers**: Methods for opening and closing modals, adding, updating, and deleting notes.

### Modal Component
Handles adding and editing notes. Includes a WYSIWYG editor (`react-quill`) for the note content. Updates the state in the `App` component upon submission.

### DeleteConfirmationModal Component
Provides a confirmation dialog for deleting notes, ensuring the user confirms the deletion action before the note is removed.

## Toast Notifications
`react-toastify` is used to provide toast notifications for actions such as adding, updating, and deleting notes.

## Future Ideas

- **Auth Login**: Implement authentication to check who added or edited notes.
- **Draggable**: Add a draggable feature for notes, possibly using `react-framer-motion`.
- **Routing**: Implement state management to handle page routing.
- **Change Layout of Cards**: Allow users to change the layout of the notes cards, either a list or a grid system. 

