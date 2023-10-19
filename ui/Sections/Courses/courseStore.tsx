import { create } from "zustand";

interface CourseStore {
  activeLessonIndex: number | any;
  activeModuleIndex: any;
  finishedScreen: boolean;
  setActiveLessonIndex: (index: number | any) => void;
  setActiveModuleIndex: (index: any) => void;
  setFinishedScreen: (finished: boolean) => void;
}

const useCourseStore = create<CourseStore>((set) => ({
  activeLessonIndex: 0,
  activeModuleIndex: null,
  finishedScreen: false,
  setActiveLessonIndex: (index) => set({ activeLessonIndex: index }),
  setActiveModuleIndex: (index) => set({ activeModuleIndex: index }),
  setFinishedScreen: (finished) => set({ finishedScreen: finished }),
}));

export default useCourseStore;
