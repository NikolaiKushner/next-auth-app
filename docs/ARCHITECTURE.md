# Architecture Overview

This document provides a visual overview of the application's architecture with the new auth layout structure.

## 🏗️ Application Structure

The application uses Next.js 15 App Router with a route group pattern for protected pages:

### Route Organization

```mermaid
graph TD
    A["app/"] --> B["(auth)/ - Protected Route Group"]
    A --> C["Public Pages"]
    A --> D["api/"]
    A --> E["components/"]
    
    B --> F["layout.tsx<br/>🔒 Auth Check<br/>📱 Navigation Header"]
    B --> G["dashboard/"]
    B --> H["profile/"]
    B --> I["todos/"]
    
    C --> J["page.tsx (Home)"]
    C --> K["sign-in/"]
    C --> L["sign-up/"]
    C --> M["forgot-password/"]
    C --> N["reset-password/"]
    
    D --> O["auth/"]
    D --> P["todos/"]
    
    E --> Q["Navigation.tsx"]
    E --> R["Button.tsx"]
    E --> S["Input.tsx"]
    E --> T["ConfirmModal.tsx"]
    
    style B fill:#e1f5fe
    style F fill:#bbdefb
    style C fill:#f3e5f5
```

## 🔒 Authentication Flow

### Protected Pages Architecture

```mermaid
graph LR
    A["User visits /dashboard"] --> B{"(auth)/layout.tsx<br/>Auth Check"}
    B -->|Authenticated| C["Show Navigation Header"]
    B -->|Not Authenticated| D["Redirect to /sign-in"]
    C --> E["Render Page Content"]
    
    style B fill:#ffecb3
    style C fill:#c8e6c9
    style D fill:#ffcdd2
```

### Layout Hierarchy

```mermaid
graph TD
    A["app/layout.tsx<br/>Root Layout"] --> B["(auth)/layout.tsx<br/>Auth Layout"]
    B --> C["dashboard/page.tsx"]
    B --> D["profile/page.tsx"]
    B --> E["todos/page.tsx"]
    B --> F["todos/[slug]/page.tsx"]
    B --> G["todos/new/page.tsx"]
    
    A --> H["Public Pages<br/>(No Auth Layout)"]
    H --> I["sign-in/page.tsx"]
    H --> J["sign-up/page.tsx"]
    H --> K["page.tsx (Home)"]
    
    style A fill:#e8f5e8
    style B fill:#e1f5fe
    style H fill:#fce4ec
```

## 🧭 Navigation System

### Header Navigation

The auth layout provides a consistent navigation header across all protected pages:

```mermaid
graph LR
    A["Auth Layout Header"] --> B["App Logo"]
    A --> C["Navigation Menu"]
    A --> D["Sign Out Button"]
    
    C --> E["Dashboard"]
    C --> F["TODO Lists"]
    C --> G["Profile"]
    
    style A fill:#e3f2fd
    style C fill:#f1f8e9
```

## 📊 Data Flow

### Component Data Flow

```mermaid
graph TD
    A["(auth)/layout.tsx<br/>🔒 Auth Check"] --> B["Supabase Auth"]
    B --> C{"User Authenticated?"}
    C -->|Yes| D["Load Navigation"]
    C -->|No| E["Redirect to /sign-in"]
    
    D --> F["Page Components"]
    F --> G["API Routes"]
    G --> H["Supabase Database"]
    
    H --> I["Profiles Table"]
    H --> J["TODO Lists Table"]
    H --> K["TODO Items Table"]
    H --> L["Storage Bucket"]
    
    style A fill:#e1f5fe
    style B fill:#fff3e0
    style G fill:#f3e5f5
    style H fill:#e8f5e8
```

## 🎨 UI Component Structure

### Shared Components

```mermaid
graph TD
    A["app/components/"] --> B["Button.tsx<br/>Reusable button with variants"]
    A --> C["Input.tsx<br/>Form input with validation"]
    A --> D["Navigation.tsx<br/>Header navigation menu"]
    A --> E["ConfirmModal.tsx<br/>Confirmation dialogs"]
    
    F["(auth)/layout.tsx"] --> D
    G["All Pages"] --> B
    G --> C
    H["Delete Actions"] --> E
    
    style A fill:#e8f5e8
    style F fill:#e1f5fe
```

## 🗄️ Database Schema

### Entity Relationships

```mermaid
erDiagram
    USERS ||--o{ PROFILES : has
    USERS ||--o{ TODO_LISTS : owns
    TODO_LISTS ||--o{ TODO_ITEMS : contains
    PROFILES ||--o{ AVATARS : stores
    
    USERS {
        uuid id PK
        string email
        timestamp created_at
    }
    
    PROFILES {
        uuid id PK,FK
        string full_name
        text bio
        string website
        string location
        string avatar_url
        timestamp created_at
        timestamp updated_at
    }
    
    TODO_LISTS {
        uuid id PK
        uuid user_id FK
        string title
        text description
        string slug
        timestamp created_at
        timestamp updated_at
    }
    
    TODO_ITEMS {
        uuid id PK
        uuid list_id FK
        string title
        text description
        boolean completed
        integer priority
        timestamp due_date
        timestamp created_at
        timestamp updated_at
    }
```

## 🚀 Benefits of This Architecture

### 1. **Separation of Concerns**
- **Public pages**: No authentication required
- **Protected pages**: Automatic authentication with shared layout
- **API routes**: Separate business logic

### 2. **Code Reusability**
- **Shared auth layout**: Single place for navigation and auth logic
- **Reusable components**: Consistent UI across all pages
- **Type safety**: TypeScript throughout the application

### 3. **Developer Experience**
- **Clear structure**: Easy to understand and maintain
- **Automatic protection**: No need to add auth checks to each page
- **Consistent navigation**: Unified header across all authenticated pages

### 4. **Performance**
- **Route groups**: No impact on URL structure
- **Layout optimization**: Shared layouts reduce re-renders
- **Component reuse**: Smaller bundle sizes

## 📱 Responsive Design

The application follows a mobile-first approach:

- **Navigation**: Collapsible on mobile devices
- **Layout**: Flexible grid system
- **Components**: Touch-friendly interactive elements
- **Typography**: Readable on all screen sizes

## 🔧 Development Workflow

### Adding New Protected Pages

1. Create page in `(auth)` directory
2. Automatic authentication and navigation
3. Access to shared components and layout

### Adding New Public Pages

1. Create page outside `(auth)` directory
2. No automatic authentication
3. Custom layout if needed

This architecture provides a clean, maintainable, and scalable foundation for the authentication application.
