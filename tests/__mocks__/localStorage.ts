// Mock localStorage for testing
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn((index: number) => {
    const keys = ['spectodo_lists', 'spectodo_ui_state', 'spectodo_prefs'];
    return keys[index] || null;
  })
};

// Mock before each test
beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
    writable: true
  });
  
  vi.clearAllMocks();
});

// Reset after each test
afterEach(() => {
  vi.restoreAllMocks();
});

export default mockLocalStorage;