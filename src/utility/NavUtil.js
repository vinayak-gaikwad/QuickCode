import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NoteIcon from '@material-ui/icons/Note';
import FolderIcon from '@material-ui/icons/Folder';
import CodeIcon from '@material-ui/icons/Code';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockIcon from '@material-ui/icons/Lock';

const navbarList = [{ text: "Editor", to: "/editor", icon: () => <CodeIcon /> },
{ text: "Notes", to: "/notes", icon: () => <NoteIcon /> },
{ text: "Resources", to: "/resources", icon: () => <FolderIcon /> },
{ text: "Logout", to: "/logout", icon: () => <ExitToAppIcon /> }
]

const signInList = [
    { text: "Login", to: "/login", icon: () => <LockIcon /> },
    { text: "Register", to: "/register", icon: () => <PersonAddIcon /> }
]

export { navbarList, signInList }