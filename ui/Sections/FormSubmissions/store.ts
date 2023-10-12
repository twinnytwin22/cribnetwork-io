import { create } from 'zustand';

interface FormSubmissionsTableStore {
  filteredSubmissions: string[];
  previewOpen: boolean;
  selectAll: boolean;
  filterMenuOpen: boolean;
  selectedFormTypes: string[]
  selectedSubmission: any | null;
  setSelectAll: (state: boolean) => void;

  setPreviewOpen: (state: boolean) => void;
  setFilterMenuOpen: (state: boolean) => void;
  setSelectedFormTypes: (selectedFormTypes: string[]) => void
  setSelectedSubmission: (submission: any) => void;
  setFilteredSubmissions: (submissions:string[]) => void;
}

export const useFormSubmissionTableStore = create<FormSubmissionsTableStore>((set) => ({
  filteredSubmissions: [],
  selectAll: true,
  selectedFormTypes: [],
  previewOpen: false, // Initialize previewOpen to false
  filterMenuOpen:false,
  selectedSubmission: null, // Initialize selectedSubmission to null
  setSelectAll: (state: boolean) => set({selectAll: state}),

  setPreviewOpen: (state: boolean) => set({previewOpen: state}),
  setFilterMenuOpen: (state: boolean) => set({filterMenuOpen: state}),
  setSelectedSubmission: (submission: any) => set({selectedSubmission: submission}),
  setFilteredSubmissions: (submissions:string[]) => set({filteredSubmissions: submissions}),
  setSelectedFormTypes: (selectedFormTypes: string[]) => set({selectedFormTypes}),

  // Add a function to open the preview modal and set the selected submission
  openPreview: (submission: any) => {
    set({ previewOpen: true, selectedSubmission: submission });
  },
  // Add a function to close the preview modal and reset the selected submission
  closePreview: () => {
    set({ previewOpen: false, selectedSubmission: null });
  },
}));
