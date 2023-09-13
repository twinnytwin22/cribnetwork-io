import {create} from 'zustand'

export interface SearchState {
    searchTerm: string;
    searchResults: {
        courses?: any[] | null;
    };
    isOpen: boolean;
    isInputFocused: boolean;
    setSearchTerm: (newSearchTerm: string) => void;
    setSearchResults: (newResults: { courses: any[] | null}) => void;
    setIsOpen: (newIsOpen: boolean) => void;
    setIsInputFocused: (newIsInputFocused: boolean) => void;
  }
  
// Create the searchStore
export const useSearchStore = create<SearchState>((set) => ({
  searchTerm: '',
  searchResults: {
    courses: [],
  },
  isOpen: false,
  isInputFocused: false,
  setSearchTerm: (newSearchTerm: string) => set({ searchTerm: newSearchTerm }),
  setSearchResults: (newResults: { courses:any[] | null} ) => set({ searchResults: newResults }),
  setIsOpen: (newIsOpen: boolean) => set({ isOpen: newIsOpen }),
  setIsInputFocused: (newIsInputFocused: boolean) => set({ isInputFocused: newIsInputFocused }),
})); 

// Usage in your component



