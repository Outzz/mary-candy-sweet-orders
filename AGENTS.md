# Project rules
- Resolve Lovable asset pointers through the published Lovable origin when rendering images so external deployments also load them.
- Keep the Christmas catalog in one shared frontend module for the home and menu so prices, photos and flavor options stay consistent.
- Use the shared serving-range helper for tray size details so the home and product dialog show the same portions.- Christmas products are stored in the products table (badge "Natal") so admins edit them; src/lib/christmas-products.ts stays as the reference list of their slugs.
