import { TestBed, async, inject } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';

xdescribe('AdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuard]
    });
  });

  xit('should ...', inject([AdminGuard], (guard: AdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
