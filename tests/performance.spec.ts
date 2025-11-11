/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, expect } from '@playwright/test';

test.describe('Homepage Performance & Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Check title
    await expect(page).toHaveTitle(/TechBrand/);
    
    // Check main heading is visible
    const heading = page.getByRole('heading', { name: /Transform Your/i });
    await expect(heading).toBeVisible();
  });

  test('should have good Core Web Vitals', async ({ page }) => {
    // Measure LCP (Largest Contentful Paint)
    const lcp = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Timeout after 5 seconds
        setTimeout(() => resolve(0), 5000);
      });
    });
    
    // LCP should be less than 2.5 seconds
    expect(lcp).toBeLessThan(2500);
    
    // Check CLS (Cumulative Layout Shift)
    const cls = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let clsValue = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          resolve(clsValue);
        }).observe({ entryTypes: ['layout-shift'] });
        
        // Measure for 3 seconds
        setTimeout(() => resolve(clsValue), 3000);
      });
    });
    
    // CLS should be less than 0.1
    expect(cls).toBeLessThan(0.1);
  });

  test('should navigate to sections smoothly', async ({ page }) => {
    // Click Features link
    await page.click('a[href="#features"]');
    await page.waitForTimeout(500);
    
    // Check if scrolled to features section
    const featuresSection = page.locator('#features');
    await expect(featuresSection).toBeInViewport();
    
    // Click Pricing link
    await page.click('a[href="#pricing"]');
    await page.waitForTimeout(500);
    
    // Check if scrolled to pricing section
    const pricingSection = page.locator('#pricing');
    await expect(pricingSection).toBeInViewport();
  });

  test('should open and close mobile menu', async ({ page }) => {
    // Set viewport to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Click menu button
    const menuButton = page.getByRole('button', { name: /menu/i });
    await menuButton.click();
    
    // Check if menu is visible
    const mobileMenu = page.locator('[data-mobile-menu]');
    await expect(mobileMenu).toBeVisible();
    
    // Click close button
    const closeButton = page.getByRole('button', { name: /close/i });
    await closeButton.click();
    
    // Check if menu is hidden
    await expect(mobileMenu).not.toBeVisible();
  });

  test('should toggle dark mode', async ({ page }) => {
    // Find dark mode toggle
    const darkModeToggle = page.getByRole('button', { name: /dark mode|theme/i });
    
    // Get initial theme
    const initialTheme = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    
    // Click toggle
    await darkModeToggle.click();
    await page.waitForTimeout(300);
    
    // Check theme changed
    const newTheme = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    
    expect(newTheme).not.toBe(initialTheme);
  });

  test('should submit contact form', async ({ page }) => {
    // Scroll to contact form
    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();
    
    // Fill form
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('textarea[name="message"]', 'Test message');
    
    // Submit form
    const submitButton = page.getByRole('button', { name: /send|submit/i });
    await submitButton.click();
    
    // Wait for success message or toast
    await page.waitForTimeout(1000);
    
    // Check for success indicator (adjust selector based on your implementation)
    const successMessage = page.locator('[data-toast]', { hasText: /success|sent/i });
    await expect(successMessage).toBeVisible({ timeout: 5000 });
  });

  test('should have no console errors', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Allow some time for any delayed errors
    await page.waitForTimeout(2000);
    
    // Check no errors occurred
    expect(errors).toHaveLength(0);
  });

  test('should load all images', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Get all images
    const images = await page.locator('img').all();
    
    // Check each image loaded successfully
    for (const img of images) {
      const isComplete = await img.evaluate((el: HTMLImageElement) => el.complete);
      const naturalHeight = await img.evaluate((el: HTMLImageElement) => el.naturalHeight);
      
      expect(isComplete).toBe(true);
      expect(naturalHeight).toBeGreaterThan(0);
    }
  });

  test('should be accessible', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check for alt text on images
    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
    
    // Check for proper heading hierarchy
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1); // Should have exactly one h1
    
    // Check for skip to content link
    const skipLink = page.getByRole('link', { name: /skip to content/i });
    await expect(skipLink).toBeInViewport();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Focus on first interactive element
    await page.keyboard.press('Tab');
    
    // Check focus is visible
    const focused = await page.evaluate(() => {
      const activeElement = document.activeElement;
      const computedStyle = window.getComputedStyle(activeElement as Element);
      return computedStyle.outlineWidth !== '0px' || computedStyle.boxShadow !== 'none';
    });
    
    expect(focused).toBe(true);
    
    // Navigate through several elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
    }
    
    // Press Enter on focused element (should work)
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
  });

  test('should have proper meta tags for SEO', async ({ page }) => {
    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toBeTruthy();
    expect(metaDescription!.length).toBeGreaterThan(50);
    expect(metaDescription!.length).toBeLessThan(160);
    
    // Check Open Graph tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();
    
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDescription).toBeTruthy();
    
    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toBeTruthy();
    
    // Check Twitter Card tags
    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    expect(twitterCard).toBe('summary_large_image');
  });

  test('should have proper caching headers', async ({ page }) => {
    const response = await page.goto('/');
    
    // Check response headers
    const headers = response?.headers();
    
    // Should have cache control
    expect(headers).toHaveProperty('cache-control');
    
    // Should have content type
    expect(headers?.['content-type']).toContain('text/html');
  });
});

test.describe('Cross-browser compatibility', () => {
  test('should work in different viewport sizes', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1920, height: 1080, name: 'Desktop' },
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Check main heading is visible
      const heading = page.getByRole('heading', { name: /Transform Your/i });
      await expect(heading).toBeVisible();
    }
  });
});
