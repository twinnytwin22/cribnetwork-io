import {create} from 'zustand'

interface FormSubmissionsTableStore {
 filteredSubmission: string[],
}

export const useForSubmissionTableStore = create<FormSubmissionsTableStore>((set) => ({
    filteredSubmission: []
})

)