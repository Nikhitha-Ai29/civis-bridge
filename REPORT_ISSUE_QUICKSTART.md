# Report Issue Feature - Quick Start

## 🚀 Try It Now!

The CivisBridge app is running at: **http://localhost:5173/**

### Quick 30-Second Test

1. **Open the app** → Go to Dashboard
2. **Click "Report Now"** button (blue card on right side)
3. **Fill the form**:
   - Title: "Street light broken"
   - Description: "The street light at the corner is not working properly"
   - Category: "Lighting"
   - Location: "Main St & 5th Ave"
   - Email: "user@example.com"
4. **Click "📝 Submit Issue"**
5. **Done!** ✅ New issue appears at top of trending list

## 📝 Form Requirements

**All fields are required:**

| Field | Min | Max | Example |
|-------|-----|-----|---------|
| Title | 5 | 100 | "Pothole on Main Street" |
| Description | 20 | 500 | "Large pothole near the intersection..." |
| Category | - | - | Roads, Parks, Utilities, etc. |
| Location | 1 | - | "Main Street & 5th Avenue" |
| Email | - | - | "your@email.com" |

## ✨ Features

✅ **Real-time Validation**
- Character counters show as you type
- Errors appear when you submit
- Errors clear when you start typing again

✅ **Smooth User Experience**
- Beautiful modal with animations
- Loading spinner during submission
- Auto-closes on success
- Click X or outside to cancel

✅ **Dynamic Dashboard**
- New issues appear immediately
- Total issue count updates
- Issues start as "Submitted" status
- Show reporter name and timestamp

## 🎯 What Happens After Submit

1. Your issue appears at the TOP of "Trending Issues"
2. Status shows as "Submitted" (yellow badge)
3. 0 upvotes initially
4. "just now" timestamp
5. Other users can see and upvote it

## ❌ Common Validation Errors

| Error | Fix |
|-------|-----|
| "Title must be at least 5 characters" | Make title longer (min 5 chars) |
| "Description must be at least 20 characters" | Add more details (min 20 chars) |
| "Please enter a valid email" | Use format: name@domain.com |
| "Location is required" | Enter a specific address |

## 🎨 Modal Features

- **Smooth Animation**: Modal slides in from top
- **Backdrop Blur**: Background blurs for focus
- **Click Outside**: Click outside modal to close
- **Close Button**: X button in top-right corner
- **Cancel Button**: Cancel button to close without submitting

## 💡 Tips

1. **Be Specific**: More detail helps officials respond faster
2. **Accurate Location**: Include street name and cross streets
3. **Include Category**: Helps route issue to right department
4. **Verify Email**: Used for updates about your issue

## 🔄 Test Multiple Issues

Try submitting several issues to see:
- How they appear in the list
- How the count updates
- How they're sorted (newest first)
- Different status badges

## 📱 Works On

✅ Desktop / Laptop
✅ Tablet
✅ Mobile Phone
✅ All modern browsers

## 🚨 Note

**Current Version**: Data stored in browser only (resets on refresh)

In production version, issues will be saved to a database.

---

**Ready to test?** Click the "Report Now" button! 🎉
