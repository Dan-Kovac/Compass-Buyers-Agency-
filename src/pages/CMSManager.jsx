import React from "react";
import { CaseStudy } from "@/entities/CaseStudy";
import { Testimonial } from "@/entities/Testimonial";
import { TeamMember } from "@/entities/TeamMember";
import { BlogPost } from "@/entities/BlogPost";
import { Acquisition } from "@/entities/Acquisition"; // New import
import { Asset } from "@/entities/Asset";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AssetUploader from "@/components/admin/AssetUploader";
import { Plus, Edit, Trash2, Eye, EyeOff, Star, ExternalLink, GripVertical, Link as LinkIcon, Upload } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ReactQuill from "react-quill";
import { UploadFile } from "@/integrations/Core";
import { InvokeLLM } from "@/integrations/Core";
import { base44 } from "@/api/base44Client"; // New import for bulkCreate
import { createPageUrl } from "@/utils";
import BlogTable from "@/components/blog/BlogTable";
import BlogEditor from "@/components/blog/BlogEditor";

const PROPERTY_TYPES = ["house", "apartment", "townhouse", "acreage", "investment", "commercial"];
const LOCATIONS = ["Byron Bay", "Ballina", "Kingscliff", "Cabarita", "Tweed Heads", "Mullumbimby", "Lennox Head", "Other"];
const CLIENT_TYPES = ["first-home-buyer", "upgrader", "investor", "interstate-relocator", "international-buyer", "downsizer"];

// Helper to convert plural collection name to singular type name for template/importer
const getTypeFromCollection = (collectionName) => {
  if (collectionName === "case_studies") return "case_study"; // legacy support
  if (collectionName === "testimonials") return "testimonial";
  if (collectionName === "team_members") return "team_member";
  if (collectionName === "blog_posts") return "blog_post"; // New
  if (collectionName === "acquisitions") return "acquisition"; // New
  // Fallback for other collections if they follow plural-s rule
  return collectionName.slice(0, -1);
};

export default function CMSManager() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState(null);
  const [collection, setCollection] = React.useState("testimonials"); // testimonials | team_members | blog_posts | acquisitions
  const [isReordering, setIsReordering] = React.useState(false); // New state for reordering feedback
  const [agents, setAgents] = React.useState([]); // Active team members for acquisitions agent dropdown
  const [selectedIds, setSelectedIds] = React.useState([]); // For bulk delete

  // showUrlImport and importUrl are removed for acquisitions.
  // The URL import for other collections is handled by the generic ContentImporter page.
  const [importing, setImporting] = React.useState(false); // Shared importing state for CSV (was for URL and CSV)

  const [showCsvImport, setShowCsvImport] = React.useState(false);
  const [csvFile, setCsvFile] = React.useState(null);
  const [importResults, setImportResults] = React.useState(null);
  const [csvData, setCsvData] = React.useState(null); // Parsed CSV data { headers: [], rows: [], delimiter: ',' }
  const [columnMapping, setColumnMapping] = React.useState({}); // User's column mappings { csvHeader: targetField }
  const [importStep, setImportStep] = React.useState('upload'); // 'upload' | 'mapping' | 'preview' | 'results'
  const [generatingExcerpt, setGeneratingExcerpt] = React.useState(false);
  const [autoGenerateExcerpts, setAutoGenerateExcerpts] = React.useState(false);
  const [previewData, setPreviewData] = React.useState({ valid: [], invalid: [], duplicates: [] });

  // Set default section from query params (fallback to acquisitions for alphabetical ordering)
  React.useEffect(() => {
    const qp = new URLSearchParams(window.location.search);
    const wanted = qp.get("collection") || "acquisitions";
    const allowed = ["testimonials", "team_members", "blog_posts", "acquisitions"];
    if (typeof setCollection === "function") {
      setCollection(allowed.includes(wanted) ? wanted : "acquisitions");
    }
  }, []);

  // Load active team members once for the agent dropdown
  React.useEffect(() => {
    (async () => {
      try {
        const list = await TeamMember.filter({ active: true }, "order");
        setAgents(list || []);
      } catch (e) {
        setAgents([]);
      }
    })();
  }, []);

  const [form, setForm] = React.useState({
    // Initial state for Testimonial, will be overridden by startCreate/startEdit
    name: "",
    location: "",
    photo_url: "",
    quote: "",
    rating: 5,
    status: "published"
  });
  // Acquisition form state will be set on create/edit when collection === "acquisitions"
  const quillRef = React.useRef(null);
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // One-time, silent migration of Case Studies -> Blog (idempotent)
  const autoMigrateCaseStudiesToBlog = React.useCallback(async () => {
    try {
      if (typeof window === "undefined") return;
      const doneFlag = localStorage.getItem("cs_migrated_to_blog");
      // Even if flag is set, also skip when there are no case studies
      const list = await CaseStudy.list("-updated_date", 500);
      const items = Array.isArray(list) ? list : [];
      if (!items.length) {
        localStorage.setItem("cs_migrated_to_blog", "1");
        return;
      }
      if (doneFlag === "1") return; // already migrated
      let created = 0;
      for (const cs of items) {
        const existing = await BlogPost.filter({ legacy_case_study_id: String(cs.id) }, "-updated_date", 1);
        if (existing && existing.length) continue;
        const payload = {
          title: cs.title || "Untitled",
          content: cs.content || "",
          excerpt: cs.excerpt || "",
          featured_image: cs.featured_image || "",
          slug: cs.slug || "",
          author: "Compass Buyers Agency",
          category: "case-studies",
          tags: ["case-study"],
          status: cs.status || "published",
          meta_title: cs.meta_title || "",
          meta_description: cs.meta_description || "",
          published_date: cs.published_date || "",
          property_type: cs.property_type || "",
          location: cs.location || "",
          client_type: cs.client_type || "",
          purchase_price: cs.purchase_price || "",
          timeframe: cs.timeframe || "",
          legacy_case_study_id: String(cs.id)
        };
        await BlogPost.create(payload);
        created++;
      }
      localStorage.setItem("cs_migrated_to_blog", "1");
      if (created > 0) {
        console.info(`Migrated ${created} case studies to Blog.`);
      }
    } catch (e) {
      console.warn("Case studies auto-migration skipped or failed:", e);
    }
  }, []);

  React.useEffect(() => {
    autoMigrateCaseStudiesToBlog();
  }, [autoMigrateCaseStudiesToBlog]);

  // Define loader before effects to avoid TDZ error
  const load = React.useCallback(async () => {
    setLoading(true);
    let list = [];
    if (collection === "testimonials") {
      list = await Testimonial.list("-updated_date", 100);
    } else if (collection === "team_members") {
      // Load by defined order for consistent drag-and-drop
      list = await TeamMember.list("order", 200); // Increased limit for potential reordering
    } else if (collection === "blog_posts") {
      list = await BlogPost.list("-updated_date", 200);
    } else if (collection === "acquisitions") {
      list = await Acquisition.list("-purchase_date", 200);
    }
    setItems(list || []);
    setLoading(false);
  }, [collection]);

  // Reload when switching collections
  React.useEffect(() => { 
    load(); 
    setSelectedIds([]); // Clear selection when switching collections
  }, [load]);

  const startCreate = () => {
    setEditing(null);
    if (collection === "testimonials") {
      setForm({
        name: "",
        location: "",
        photo_url: "",
        quote: "",
        rating: 5,
        status: "published"
      });
    } else if (collection === "team_members") {
      setForm({
        name: "",
        position: "",
        bio: "",
        photo: "",
        email: "",
        phone: "",
        credentials: [],
        linkedin_url: "",
        intro_video_url: "",
        order: 0,
        active: true
      });
    } else if (collection === "blog_posts") {
      // Blog posts are handled by BlogEditor dialog; no need to preset form here
    } else if (collection === "acquisitions") {
      setForm({
        title: "",
        main_image_url: "",
        suburb: "",
        state: "NSW",
        lga: "Byron Shire",
        property_type: "house",
        beds: 0,
        baths: 0,
        cars: 0,
        land_size: "",
        land_size_unit: "sqm",
        purchase_price: "",
        price_display: "",
        purchase_date: "",
        agent: "",
        market_visibility: "on_market",
        timeframe: "",
        excerpt: "",
        realestate_link: "",
        tags: [],
        slug: "",
        status: "published",
        featured: false
      });
    }
    setOpen(true);
  };

  const startEdit = (item) => {
    setEditing(item);
    if (collection === "testimonials") {
      setForm({
        name: item.name || "",
        location: item.location || "",
        photo_url: item.photo_url || "",
        quote: item.quote || "",
        rating: typeof item.rating === "number" ? item.rating : 5,
        status: item.status || "published"
      });
    } else if (collection === "team_members") {
      setForm({
        name: item.name || "",
        position: item.position || "",
        bio: item.bio || "",
        photo: item.photo || "",
        email: item.email || "",
        phone: item.phone || "",
        credentials: Array.isArray(item.credentials) ? item.credentials : [],
        linkedin_url: item.linkedin_url || "",
        intro_video_url: item.intro_video_url || "",
        order: typeof item.order === "number" ? item.order : 0,
        active: typeof item.active === "boolean" ? item.active : true
      });
    } else if (collection === "blog_posts") {
      // Handled by BlogEditor via 'editing' state
    } else if (collection === "acquisitions") {
      setForm({
        title: item.title || "",
        main_image_url: item.main_image_url || "",
        suburb: item.suburb || "",
        state: item.state || "NSW",
        lga: item.lga || "Byron Shire",
        property_type: item.property_type || "house",
        beds: typeof item.beds === "number" ? item.beds : 0,
        baths: typeof item.baths === "number" ? item.baths : 0,
        cars: typeof item.cars === "number" ? item.cars : 0,
        land_size: item.land_size || "",
        land_size_unit: item.land_size_unit || "sqm",
        purchase_price: item.purchase_price || "",
        price_display: item.price_display || "",
        purchase_date: item.purchase_date || "",
        agent: item.agent || "",
        market_visibility: item.market_visibility || "on_market",
        timeframe: item.timeframe || "",
        excerpt: item.excerpt || "",
        realestate_link: item.realestate_link || "",
        tags: Array.isArray(item.tags) ? item.tags : [],
        slug: item.slug || "",
        status: item.status || "published",
        featured: !!item.featured
      });
    }
    setOpen(true);
  };

  // Insert image into Quill content
  const handleInsertImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const { file_url } = await UploadFile({ file });
      await Asset.create({ name: file.name, type: "image", url: file_url, mime_type: file.type || "image/jpeg", size: file.size });
      const editor = quillRef.current?.getEditor();
      const range = editor?.getSelection(true);
      const index = range ? range.index : editor?.getLength() || 0;
      editor?.insertEmbed(index, "image", file_url, "user");
      editor?.setSelection(index + 1, 0);
    };
    input.click();
  };

  const quillModules = React.useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"]
      ],
      handlers: { image: handleInsertImage }
    }
  }), []);

  // Acquisition image upload
  const uploadAcquisitionImage = async ({ url, file }) => {
    setForm((f) => ({ ...f, main_image_url: url }));
    await Asset.create({ name: file.name, type: "image", url, mime_type: file.type || "image/jpeg", size: file.size });
  };

  const save = async () => {
    const payload = { ...form };
    if (collection === "testimonials") {
      if (editing) {
        await Testimonial.update(editing.id, payload);
      } else {
        await Testimonial.create(payload);
      }
    } else if (collection === "team_members") {
      if (editing) {
        await TeamMember.update(editing.id, payload);
      } else {
        await TeamMember.create(payload);
      }
    } else if (collection === "acquisitions") {
      // Clean up numeric fields - convert empty strings to null/0 for optional number fields
      const cleanedPayload = { ...payload };

      // Handle numeric fields that might be empty strings
      if (cleanedPayload.purchase_price === "" || cleanedPayload.purchase_price === null) {
        delete cleanedPayload.purchase_price; // Remove if empty, backend can treat as null or default
      } else if (typeof cleanedPayload.purchase_price === "string") {
        cleanedPayload.purchase_price = Number(cleanedPayload.purchase_price); // Convert to number if it's a string
      }
      if (cleanedPayload.land_size === "" || cleanedPayload.land_size === null) {
        delete cleanedPayload.land_size;
      } else if (typeof cleanedPayload.land_size === "string") {
        cleanedPayload.land_size = Number(cleanedPayload.land_size);
      }

      // Set beds, baths, cars to 0 if they are empty strings or null
      if (cleanedPayload.beds === "" || cleanedPayload.beds === null) {
        cleanedPayload.beds = 0;
      }
      if (cleanedPayload.baths === "" || cleanedPayload.baths === null) {
        cleanedPayload.baths = 0;
      }
      if (cleanedPayload.cars === "" || cleanedPayload.cars === null) {
        cleanedPayload.cars = 0;
      }

      // Handle empty string fields that should be omitted (or set to null if preferred by backend)
      if (cleanedPayload.purchase_date === "") {
        delete cleanedPayload.purchase_date;
      }
      if (cleanedPayload.agent === "") {
        delete cleanedPayload.agent;
      }
      if (cleanedPayload.timeframe === "") {
        delete cleanedPayload.timeframe;
      }
      if (cleanedPayload.excerpt === "") {
        delete cleanedPayload.excerpt;
      }
      if (cleanedPayload.slug === "") {
        delete cleanedPayload.slug;
      }
      if (cleanedPayload.price_display === "") {
        delete cleanedPayload.price_display;
      }

      if (editing) {
        await Acquisition.update(editing.id, cleanedPayload);
      } else {
        await Acquisition.create(cleanedPayload);
      }
    }
    setOpen(false);
    setEditing(null);
    load();
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete "${item.title || item.name}"? This cannot be undone.`)) return;
    if (collection === "testimonials") {
      await Testimonial.delete(item.id);
    } else if (collection === "team_members") {
      await TeamMember.delete(item.id);
    } else if (collection === "blog_posts") {
      await BlogPost.delete(item.id);
    } else if (collection === "acquisitions") {
      await Acquisition.delete(item.id);
    }
    load();
  };

  const bulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Delete ${selectedIds.length} item(s)? This cannot be undone.`)) return;
    
    try {
      for (const id of selectedIds) {
        if (collection === "testimonials") {
          await Testimonial.delete(id);
        } else if (collection === "team_members") {
          await TeamMember.delete(id);
        } else if (collection === "blog_posts") {
          await BlogPost.delete(id);
        } else if (collection === "acquisitions") {
          await Acquisition.delete(id);
        }
      }
      setSelectedIds([]);
      load();
    } catch (err) {
      alert(`Error deleting items: ${err.message}`);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map(it => it.id));
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const togglePublish = async (item) => {
    if (collection === "testimonials") {
      const next = item.status === "published" ? "draft" : "published";
      await Testimonial.update(item.id, { status: next });
    } else if (collection === "acquisitions") {
      const next = item.status === "published" ? "draft" : "published";
      await Acquisition.update(item.id, { status: next });
    }
    load();
  };

  const toggleFeaturedAcq = async (item) => {
    if (collection !== "acquisitions") return;
    await Acquisition.update(item.id, { featured: !item.featured });
    load();
  };

  const toggleActiveMember = async (item) => {
    if (collection === "team_members") {
      await TeamMember.update(item.id, { active: !item.active });
      load();
    }
  };

  const uploadTestimonialPhoto = async ({ url, file }) => {
    update("photo_url", url);
    await Asset.create({ name: file.name, type: "image", url, mime_type: file.type || "image/jpeg", size: file.size });
  };

  const uploadTeamMemberPhoto = async ({ url, file }) => {
    update("photo", url);
    await Asset.create({ name: file.name, type: "image", url, mime_type: file.type || "image/jpeg", size: file.size });
  };

  const canSave =
    (collection === "testimonials" && form.name && form.quote) ||
    (collection === "team_members" && form.name && form.position && form.bio) ||
    (collection === "acquisitions" && form.title && form.main_image_url && form.suburb && form.lga && form.property_type && form.state);

  // Drag and drop ordering for Team Members
  const handleTeamMemberDragEnd = async (result) => {
    const { destination, source } = result || {};
    if (!destination || destination.index === source.index) return;

    const reordered = Array.from(items);
    const [moved] = reordered.splice(source.index, 1);
    reordered.splice(destination.index, 0, moved);

    // Update local state immediately for snappy UI
    setItems(reordered);

    // Persist new sequential order values (1-based)
    setIsReordering(true);
    try {
      const updates = reordered.map((it, idx) => ({ id: it.id, order: idx + 1 }));
      await Promise.all(updates.map((u) => TeamMember.update(u.id, { order: u.order })));
    } catch (error) {
      console.error("Failed to save new team member order:", error);
      // Optionally, reload items to revert to the last saved state if saving failed
      load();
    } finally {
      setIsReordering(false);
    }
  };

  // Helper for Australian date formats
  const parseAustralianDate = (dateStr) => {
    if (!dateStr) return null;
    const clean = String(dateStr).trim();
    if (!clean) return null;

    // Try DD/MM/YYYY or DD-MM-YYYY or DD.MM.YYYY
    const parts = clean.split(/[\/\-\.]/);
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      let year = parseInt(parts[2], 10);
      
      // Basic validation to distinguish from ISO (YYYY-MM-DD)
      // If first part is obviously a year (> 1900), assume ISO
      if (day > 1900) return new Date(clean).toISOString().split('T')[0];

      if (day >= 1 && day <= 31 && month >= 1 && month <= 12) {
        // Handle 2 digit year
        if (year < 100) year = year > 50 ? 1900 + year : 2000 + year;
        return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      }
    }
    
    // Fallback to standard parser
    const d = new Date(clean);
    return !isNaN(d.getTime()) ? d.toISOString().split('T')[0] : clean;
  };

  // Enhanced CSV parsing with delimiter detection
  const detectDelimiter = (text) => {
    const firstLine = text.split('\n')[0];
    const delimiters = [',', ';', '\t', '|'];
    let maxCount = 0;
    let detectedDelimiter = ',';

    delimiters.forEach(delimiter => {
      const count = (firstLine.match(new RegExp('\\' + delimiter, 'g')) || []).length;
      if (count > maxCount) {
        maxCount = count;
        detectedDelimiter = delimiter;
      }
    });

    return detectedDelimiter;
  };

  // Improved CSV parser that handles quoted fields, multiple encodings, and edge cases
  const parseCSV = (text, delimiter = null) => {
    if (!delimiter) {
      delimiter = detectDelimiter(text);
    }

    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length < 2) return { headers: [], rows: [], delimiter };

    // Parse a line considering quoted fields
    const parseLine = (line) => {
      const result = [];
      let current = '';
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"') {
          if (inQuotes && nextChar === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === delimiter && !inQuotes) {
          result.push(current);
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current);
      return result.map(s => s.trim()); // Trim each value
    };

    const headers = parseLine(lines[0]).map(h => h.replace(/['"]/g, '').trim());
    const rows = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseLine(lines[i]);
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      rows.push(row);
    }

    return { headers, rows, delimiter };
  };

  // Handle file upload and initial parse
  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCsvFile(file);

    try {
      // Try UTF-8 first
      let text = await file.text();

      // If it looks garbled, try other encodings
      if (text.includes('')) { // Using the Unicode replacement character for garbled text check
        // Try reading with different encoding (note: browsers have limited encoding support)
        const reader = new FileReader();
        reader.onload = (event) => {
          const arrayBuffer = event.target.result;
          const decoder = new TextDecoder('iso-8859-1'); // Common alternative
          text = decoder.decode(arrayBuffer);
          processCsvText(text);
        };
        reader.onerror = () => {
          alert(`Error reading file with alternative encoding. Please ensure the file is valid CSV.`);
        };
        reader.readAsArrayBuffer(file);
      } else {
        processCsvText(text);
      }
    } catch (err) {
      alert(`Error reading file: ${err.message}`);
    }
  };

  const processCsvText = (text) => {
    const parsed = parseCSV(text);
    if (!parsed.rows.length) {
      alert("No data rows found in the CSV. Please check the file format.");
      setCsvFile(null);
      setCsvData(null);
      setImportStep('upload');
      return;
    }

    setCsvData(parsed);

    // Auto-suggest column mappings based on common patterns
    const autoMapping = {};
    const fieldMappings = {
      title: ['title', 'address', 'property address', 'property name', 'name', 'street'],
      main_image_url: ['main_image_url', 'image_url', 'image', 'photo', 'main image', 'featured image'],
      suburb: ['suburb', 'town', 'city', 'locality'],
      state: ['state', 'st', 'province'],
      lga: ['lga', 'region', 'local government area', 'council'],
      property_type: ['property_type', 'type', 'property type', 'category'],
      beds: ['beds', 'bedrooms', '# beds', 'bed', 'br', '# bedrooms'],
      baths: ['baths', 'bathrooms', '# baths', 'bath', '# bathrooms', 'ba'],
      cars: ['cars', 'parking', 'garages', 'car spaces', '# cars', 'car', 'c'],
      land_size: ['land_size', 'land size', 'land area', 'lot size', 'block size', 'site area', 'area', 'sqm', 'm2', 'm²', 'acres', 'hectares', 'ha'],
      land_size_unit: ['land_size_unit', 'unit', 'land unit', 'area unit', 'sqm/acres/ha', 'm2', 'm²', 'sqm', 'acres', 'ha', 'hectares'],
      purchase_price: ['purchase_price', 'price', 'purchase price', 'sale price', 'amount', 'cost', 'value'],
      price_display: ['price_display', 'price display', 'displayed price'],
      purchase_date: ['purchase_date', 'date', 'purchase date', 'acquisition date', 'sale date'],
      agent: ['agent', 'buyer agent', 'buyers agent', 'acquired by'],
      market_visibility: ['market_visibility', 'visibility', 'market', 'on market', 'market type'],
      timeframe: ['timeframe', 'time frame', 'duration', 'days to purchase'],
      excerpt: ['excerpt', 'description', 'summary', 'notes', 'details'],
      tags: ['tags', 'keywords', 'categories'],
      slug: ['slug', 'url slug', 'permalink']
    };

    parsed.headers.forEach(header => {
      const lowerHeader = header.toLowerCase().trim();
      for (const [field, patterns] of Object.entries(fieldMappings)) {
        if (patterns.some(pattern => lowerHeader.includes(pattern) || pattern.includes(lowerHeader))) {
          autoMapping[header] = field;
          break;
        }
      }
    });

    setColumnMapping(autoMapping);
    setImportStep('mapping');
  };

  // Step 2 -> 3: Process data for preview
  const generatePreview = () => {
    const rows = csvData.rows;
    const valid = [];
    const invalid = [];
    const duplicates = [];
    const processedTitles = new Set();

    // Current items map for duplicate checking
    const existingMap = new Map(items.map(i => [`${i.title?.toLowerCase()}|${i.suburb?.toLowerCase()}`, true]));

    rows.forEach((row, index) => {
      try {
        const record = { status: 'draft', featured: false, tags: [] };
        let hasRequired = true;
        let missingFields = [];

        Object.entries(columnMapping).forEach(([csvColumn, targetField]) => {
          if (!targetField || targetField === 'ignore') return;
          
          let value = row[csvColumn];
          if (value === undefined || value === null || String(value).trim() === '') return;

          switch (targetField) {
            case 'beds':
            case 'baths':
            case 'cars':
              record[targetField] = parseInt(String(value).replace(/[^0-9]/g, '')) || 0;
              break;
            case 'land_size':
              const size = parseFloat(String(value).replace(/[^0-9.]/g, ''));
              if (!isNaN(size)) record[targetField] = size;
              break;
            case 'land_size_unit':
              {
                const unitRaw = String(value).toLowerCase();
                let unit = 'sqm';
                if (/(acre)/.test(unitRaw)) unit = 'acres';
                else if (/(ha|hect)/.test(unitRaw)) unit = 'hectares';
                else unit = 'sqm';
                record[targetField] = unit;
                break;
              }
            case 'purchase_price':
              const price = parseFloat(String(value).replace(/[^0-9.]/g, ''));
              if (!isNaN(price)) record[targetField] = price;
              break;
            case 'tags':
              record[targetField] = String(value).split(/[;,|]/).map(t => t.trim()).filter(Boolean);
              break;
            case 'state':
              const validStates = ['NSW', 'QLD'];
              const normalizedState = String(value).toUpperCase().trim();
              record[targetField] = validStates.includes(normalizedState) ? normalizedState : 'NSW';
              break;
            case 'lga':
              const validLGAs = ['Byron Shire', 'Tweed Shire', 'Ballina Shire', 'City of Gold Coast', 'Other'];
              const normalizedLGA = String(value).trim();
              record[targetField] = validLGAs.includes(normalizedLGA) ? normalizedLGA : 'Other';
              break;
            case 'market_visibility':
              record[targetField] = String(value).toLowerCase().includes('off') ? 'off_market' : 'on_market';
              break;
            case 'purchase_date':
              record[targetField] = parseAustralianDate(value);
              break;
            case 'main_image_url':
              const url = String(value).trim();
              if (url && (url.startsWith('http://') || url.startsWith('https://'))) record[targetField] = url;
              break;
            default:
              record[targetField] = String(value).trim();
          }
        });

        // Defaults
        if (record.lga === undefined) record.lga = 'Other';
        if (record.beds === undefined) record.beds = 0;
        if (record.baths === undefined) record.baths = 0;
        if (record.cars === undefined) record.cars = 0;
        if (record.property_type === undefined) record.property_type = 'house';
        if (record.state === undefined) record.state = 'NSW';
        if (record.market_visibility === undefined) record.market_visibility = 'on_market';
        if (record.land_size !== undefined && record.land_size_unit === undefined) record.land_size_unit = 'sqm';

        // Validation
        if (!record.title) missingFields.push('Title');
        if (!record.suburb) missingFields.push('Suburb');

        const enriched = { ...record, _row: index + 2 };

        if (missingFields.length > 0) {
          invalid.push({ ...enriched, _error: `Missing: ${missingFields.join(', ')}` });
        } else {
          // Check duplicates
          const key = `${record.title.toLowerCase()}|${record.suburb.toLowerCase()}`;
          if (existingMap.has(key) || processedTitles.has(key)) {
            duplicates.push({ ...enriched, _error: 'Potential duplicate (Title + Suburb match)' });
          } else {
            processedTitles.add(key);
            valid.push(enriched);
          }
        }
      } catch (e) {
        invalid.push({ _row: index + 2, _error: e.message });
      }
    });

    setPreviewData({ valid, invalid, duplicates });
    setImportStep('preview');
  };

  // Execute the import from preview data
  const executeImport = async () => {
    setImporting(true);
    const results = { total: 0, created: 0, failed: 0, errors: [] };
    
    // Combine valid and user-accepted duplicates for import
    // (For now we just import 'valid' and 'duplicates', filtering out explicit errors)
    const recordsToImport = [...previewData.valid, ...previewData.duplicates];
    
    results.total = recordsToImport.length;

    try {
      // Auto-generate excerpts
      if (autoGenerateExcerpts) {
        const needingExcerpt = recordsToImport.filter(r => !r.excerpt);
        const BATCH_SIZE = 5;
        for (let i = 0; i < needingExcerpt.length; i += BATCH_SIZE) {
          const batch = needingExcerpt.slice(i, i + BATCH_SIZE);
          await Promise.all(batch.map(async (record) => {
            try {
               const prompt = `Write a sharp, professional 1-2 sentence summary for a property acquisition using UK/Australian English spelling.
               Details:
               - Type: ${record.property_type}
               - Location: ${record.suburb}, ${record.state}
               - Specs: ${record.beds} bed, ${record.baths} bath, ${record.cars} car
               ${record.land_size ? `- Land: ${record.land_size} ${record.land_size_unit || 'sqm'}` : ''}
               ${record.market_visibility ? `- Method: ${record.market_visibility === 'off_market' ? 'Off-market' : 'On-market'}` : ''}
               ${record.timeframe ? `- Timeline: ${record.timeframe}` : ''}

               Guidelines:
               - STRICTLY NO AI CLICHES.
               - Tone: Professional, factual, concise.
               - Length: Under 35 words.`;
              
              const desc = await base44.integrations.Core.InvokeLLM({ prompt, add_context_from_internet: false });
              record.excerpt = desc.trim();
            } catch (e) { console.warn(e); }
          }));
        }
      }

      // Prepare for DB (remove temporary fields)
      const dbRecords = recordsToImport.map(({ _row, _error, ...r }) => r);

      // Bulk Create
      if (dbRecords.length > 0) {
        try {
          await base44.entities.Acquisition.bulkCreate(dbRecords);
          results.created = dbRecords.length;
        } catch (err) {
          // Fallback to individual
          for (const rec of dbRecords) {
            try {
              await base44.entities.Acquisition.create(rec);
              results.created++;
            } catch (e) {
              results.failed++;
              results.errors.push(`Failed to create "${rec.title}": ${e.message}`);
            }
          }
        }
      }

      setImportResults(results);
      setImportStep('results');
      load();
    } catch (err) {
      results.failed = results.total;
      results.errors.push(`Import error: ${err.message}`);
      setImportResults(results);
      setImportStep('results');
    } finally {
      setImporting(false);
    }
  };

  // Reset import state
  const resetImport = () => {
    setShowCsvImport(false);
    setCsvFile(null);
    setCsvData(null);
    setColumnMapping({});
    setImportResults(null);
    setAutoGenerateExcerpts(false);
    setImportStep('upload');
  };

  // Generate excerpt for acquisition using AI
  const generateExcerpt = async () => {
    if (!form.property_type || !form.suburb) {
      alert("Please fill in at least Property Type and Suburb before generating a description.");
      return;
    }

    setGeneratingExcerpt(true);
    try {
      const prompt = `Write a sharp, professional 1-2 sentence summary for a property acquisition using UK/Australian English spelling.
      Details:
      - Type: ${form.property_type}
      - Location: ${form.suburb}${form.state ? `, ${form.state}` : ''}
      - Specs: ${form.beds || '?'} bed, ${form.baths || '?'} bath, ${form.cars || '?'} car
      ${form.land_size ? `- Land: ${form.land_size} ${form.land_size_unit || 'sqm'}` : ''}
      ${form.market_visibility ? `- Method: ${form.market_visibility === 'off_market' ? 'Off-market' : 'On-market'}` : ''}
      ${form.timeframe ? `- Timeline: ${form.timeframe}` : ''}

      Guidelines:
      - STRICTLY NO AI CLICHES: Do not use "Nestled", "Step into", "Welcome to", "Boasting", "testament to", "blend of", "oasis", "dream", "perfect", "sought-after".
      - Tone: Professional, factual, concise. Direct language only.
      - Focus: The key value (location, result, or feature).
      - Length: Under 35 words.
      - Example Output: "Secured off-market in a competitive timeline. A rare north-facing family home in the Golden Grid, purchased well under comparable sales."`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt,
        add_context_from_internet: false
      });

      update('excerpt', response.trim());
    } catch (err) {
      alert(`Failed to generate description: ${err.message}`);
    } finally {
      setGeneratingExcerpt(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bright-grey)] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">CMS Manager</h1>
            <p className="text-gray-600">Manage content collections.</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Collection selector */}
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-gray-600">Collection:</span>
              <Select value={collection} onValueChange={(v) => setCollection(v)}>
                <SelectTrigger className="w-56">
                  <SelectValue placeholder="Select collection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acquisitions">Acquisitions</SelectItem>
                  <SelectItem value="blog_posts">Blog Posts</SelectItem>
                  <SelectItem value="team_members">Team Members</SelectItem>
                  <SelectItem value="testimonials">Testimonials</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Dynamic "Edit Template" and "Import from URL" buttons for non-acquisition collections */}
            {(collection === "testimonials" || collection === "team_members" || collection === "blog_posts") && (
              <>
                <a href={createPageUrl(`TemplateEditor?type=${getTypeFromCollection(collection)}`)}>
                  <Button variant="outline">Edit Template</Button>
                </a>
                <a href={createPageUrl(`ContentImporter?type=${getTypeFromCollection(collection)}`)}>
                  <Button variant="outline">Import from URL</Button>
                </a>
              </>
            )}
            {/* CSV Import button for acquisitions */}
            {collection === "acquisitions" && (
              <Button variant="outline" onClick={() => setShowCsvImport(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Import CSV
              </Button>
            )}

            {selectedIds.length > 0 && (
              <Button variant="destructive" onClick={bulkDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete {selectedIds.length} item{selectedIds.length > 1 ? 's' : ''}
              </Button>
            )}
            <Button onClick={startCreate} className="bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              {collection === "testimonials"
                ? "New Testimonial"
                : collection === "team_members"
                  ? "New Team Member"
                  : collection === "blog_posts"
                    ? "New Blog Post"
                    : "New Acquisition"}
            </Button>
          </div>
        </div>

        {/* Mobile selector */}
        <div className="md:hidden mb-4">
          <Select value={collection} onValueChange={(v) => setCollection(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select collection" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="acquisitions">Acquisitions</SelectItem>
              <SelectItem value="blog_posts">Blog Posts</SelectItem>
              <SelectItem value="team_members">Team Members</SelectItem>
              <SelectItem value="testimonials">Testimonials</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <Card className="border-[var(--border)]"><CardContent className="p-6">Loading {collection.replace("_", " ")}...</CardContent></Card>
        ) : (
          <Card className="border-[var(--border)] shadow-lg">
            <CardContent className="p-6">
              {collection === "blog_posts" ? (
                <BlogTable
                  posts={items}
                  onEdit={startEdit}
                  onDelete={async (post) => { await BlogPost.delete(post.id); setSelectedIds([]); load(); }}
                  onTogglePublish={async (post) => { const next = post.status === "published" ? "draft" : "published"; await BlogPost.update(post.id, { status: next }); load(); }}
                  onToggleFeatured={async (post) => { await BlogPost.update(post.id, { featured: !post.featured }); load(); }}
                  selectedIds={selectedIds}
                  onToggleSelect={toggleSelect}
                  onToggleSelectAll={toggleSelectAll}
                />
              ) : collection === "acquisitions" ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-600">
                        <th className="py-2 pr-2 w-8">
                          <input 
                            type="checkbox" 
                            checked={selectedIds.length === items.length && items.length > 0}
                            onChange={toggleSelectAll}
                            className="cursor-pointer"
                          />
                        </th>
                        <th className="py-2 pr-4">Title</th>
                        <th className="py-2 pr-4">Suburb</th>
                        <th className="py-2 pr-4">Region</th>
                        <th className="py-2 pr-4">Status</th>
                        <th className="py-2 pr-4">Purchased</th>
                        <th className="py-2 pr-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((it) => (
                        <tr key={it.id} className="border-t">
                          <td className="py-3 pr-2">
                            <input 
                              type="checkbox" 
                              checked={selectedIds.includes(it.id)}
                              onChange={() => toggleSelect(it.id)}
                              className="cursor-pointer"
                            />
                          </td>
                          <td className="py-3 pr-4">
                            <div className="font-medium text-[var(--ink)]">{it.title}</div>
                            <div className="text-gray-500">{it.property_type || "-"}</div>
                          </td>
                          <td className="py-3 pr-4">{it.suburb || "-"}</td>
                          <td className="py-3 pr-4">{it.lga || "-"}</td>
                          <td className="py-3 pr-4">
                            <span className={`px-2 py-1 rounded text-xs ${it.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                              {it.status || "published"}
                            </span>
                          </td>
                          <td className="py-3 pr-4 text-gray-500">{it.purchase_date ? new Date(it.purchase_date).toLocaleDateString() : "-"}</td>
                          <td className="py-3 pr-0">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="outline" size="sm" onClick={() => toggleFeaturedAcq(it)} title={it.featured ? "Featured" : "Mark as featured"}>
                                <Star className={`w-4 h-4 ${it.featured ? "text-yellow-500" : "text-gray-500"}`} />
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => togglePublish(it)}>
                                {it.status === "published" ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => startEdit(it)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => remove(it)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {items.length === 0 && (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-gray-500">No acquisitions yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      {collection === "testimonials" ? (
                        <tr className="text-left text-gray-600">
                          <th className="py-2 pr-2 w-8">
                            <input 
                              type="checkbox" 
                              checked={selectedIds.length === items.length && items.length > 0}
                              onChange={toggleSelectAll}
                              className="cursor-pointer"
                            />
                          </th>
                          <th className="py-2 pr-4">Name</th>
                          <th className="py-2 pr-4">Status</th>
                          <th className="py-2 pr-4">Location</th>
                          <th className="py-2 pr-4">Updated</th>
                          <th className="py-2 pr-0 text-right">Actions</th>
                        </tr>
                      ) : (
                        // Team Members header with drag handle column and checkbox
                        <tr className="text-left text-gray-600">
                          <th className="py-2 pr-2 w-8">
                            <input 
                              type="checkbox" 
                              checked={selectedIds.length === items.length && items.length > 0}
                              onChange={toggleSelectAll}
                              className="cursor-pointer"
                            />
                          </th>
                          <th className="py-2 pr-2 w-8"></th> {/* Empty header for drag handle */}
                          <th className="py-2 pr-4">Name</th>
                          <th className="py-2 pr-4">Position</th>
                          <th className="py-2 pr-4">Active</th>
                          <th className="py-2 pr-4">Updated</th>
                          <th className="py-2 pr-0 text-right">Actions</th>
                        </tr>
                      )}
                    </thead>
                    <tbody>
                      {collection !== "team_members" ? (
                        <>
                          {items.map((it) => (
                            <tr key={it.id} className="border-t">
                              {collection === "testimonials" ? (
                                <>
                                  <td className="py-3 pr-2">
                                    <input 
                                      type="checkbox" 
                                      checked={selectedIds.includes(it.id)}
                                      onChange={() => toggleSelect(it.id)}
                                      className="cursor-pointer"
                                    />
                                  </td>
                                  <td className="py-3 pr-4">
                                    <div className="font-medium text-[var(--ink)]">{it.name}</div>
                                    <div className="text-gray-500">{it.quote?.slice(0, 60)}{(it.quote || "").length > 60 ? "…" : ""}</div>
                                  </td>
                                  <td className="py-3 pr-4">
                                    <span className={`px-2 py-1 rounded text-xs ${it.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                                      {it.status || "published"}
                                    </span>
                                  </td>
                                  <td className="py-3 pr-4">{it.location || "-"}</td>
                                  <td className="py-3 pr-4 text-gray-500">{it.updated_date ? new Date(it.updated_date).toLocaleDateString() : "-"}</td>
                                  <td className="py-3 pr-0">
                                    <div className="flex items-center justify-end gap-2">
                                      <a
                                        href={createPageUrl(`TestimonialDetail?id=${it.id}&source=cms`)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <Button variant="outline" size="sm">
                                          <ExternalLink className="w-4 h-4 mr-1" />
                                          Preview
                                        </Button>
                                      </a>
                                      <Button variant="outline" size="sm" onClick={() => togglePublish(it)}>
                                        {it.status === "published" ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                      </Button>
                                      <Button variant="outline" size="sm" onClick={() => startEdit(it)}>
                                        <Edit className="w-4 h-4" />
                                      </Button>
                                      <Button variant="destructive" size="sm" onClick={() => remove(it)}>
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </td>
                                </>
                              ) : null}
                            </tr>
                          ))}
                          {items.length === 0 && (
                            <tr>
                              <td colSpan={6} className="py-8 text-center text-gray-500">No {collection.replace("_", " ")} yet.</td>
                            </tr>
                          )}
                        </>
                      ) : (
                        // Team Members: Drag-and-drop body
                        <DragDropContext onDragEnd={handleTeamMemberDragEnd}>
                          <Droppable droppableId="team-members-droppable">
                            {(provided) => (
                              <tbody ref={provided.innerRef} {...provided.droppableProps}>
                                {items.map((it, index) => (
                                  <Draggable key={it.id} draggableId={String(it.id)} index={index}>
                                    {(draggableProvided, snapshot) => (
                                      <tr
                                        ref={draggableProvided.innerRef}
                                        {...draggableProvided.draggableProps}
                                        className={`border-t ${snapshot.isDragging ? "bg-[var(--bright-grey)]/60" : ""}`}
                                      >
                                        <td className="py-3 pr-2 align-middle">
                                          <input 
                                            type="checkbox" 
                                            checked={selectedIds.includes(it.id)}
                                            onChange={() => toggleSelect(it.id)}
                                            className="cursor-pointer"
                                          />
                                        </td>
                                        <td className="py-3 pr-2 align-middle">
                                          <button
                                            className="text-gray-500 hover:text-gray-700 cursor-grab"
                                            {...draggableProvided.dragHandleProps}
                                            aria-label="Drag to reorder"
                                          >
                                            <GripVertical className="w-4 h-4" />
                                          </button>
                                        </td>
                                        <td className="py-3 pr-4">
                                          <div className="font-medium text-[var(--ink)]">{it.name}</div>
                                          <div className="text-gray-500">{it.email || "-"}</div>
                                        </td>
                                        <td className="py-3 pr-4">{it.position || "-"}</td>
                                        <td className="py-3 pr-4">
                                          <span className={`px-2 py-1 rounded text-xs ${it.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                                            {it.active ? "active" : "inactive"}
                                          </span>
                                        </td>
                                        <td className="py-3 pr-4 text-gray-500">{it.updated_date ? new Date(it.updated_date).toLocaleDateString() : "-"}</td>
                                        <td className="py-3 pr-0">
                                          <div className="flex items-center justify-end gap-2">
                                            <a href={createPageUrl(`TeamMemberDetail?id=${it.id}&source=cms`)} target="_blank" rel="noopener noreferrer">
                                              <Button variant="outline" size="sm">
                                                <ExternalLink className="w-4 h-4 mr-1" />
                                                Preview
                                              </Button>
                                            </a>
                                            <Button variant="outline" size="sm" onClick={() => toggleActiveMember(it)}>
                                              {it.active ? "Deactivate" : "Activate"}
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => startEdit(it)}>
                                              <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => remove(it)}>
                                              <Trash2 className="w-4 h-4" />
                                            </Button>
                                          </div>
                                        </td>
                                      </tr>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </tbody>
                            )}
                          </Droppable>
                        </DragDropContext>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
              {collection === "team_members" && isReordering && (
                <div className="text-xs text-gray-500 mt-2">Saving order…</div>
              )}
            </CardContent>
          </Card>
        )}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto border-[var(--border)]">
            <DialogHeader>
              <DialogTitle>
                {editing
                  ? collection === "testimonials"
                    ? "Edit Testimonial"
                    : collection === "team_members"
                      ? "Edit Team Member"
                      : collection === "blog_posts"
                        ? "Edit Blog Post"
                        : "Edit Acquisition"
                  : collection === "testimonials"
                    ? "Create Testimonial"
                    : collection === "team_members"
                      ? "Create Team Member"
                      : collection === "blog_posts"
                        ? "Create Blog Post"
                        : "Create Acquisition"}
              </DialogTitle>
            </DialogHeader>

            {/* TESTIMONIALS FORM */}
            {collection === "testimonials" && (
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <Label>Name</Label>
                    <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Client name" />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="City or suburb" />
                  </div>
                  <div>
                    <Label>Quote</Label>
                    <Textarea rows={5} value={form.quote} onChange={(e) => update("quote", e.target.value)} placeholder="Client testimonial" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Photo</Label>
                    {form.photo_url ? (
                      <div className="space-y-2">
                        <img src={form.photo_url} alt="Client" className="w-full rounded-lg border object-cover" />
                        <Button variant="outline" onClick={() => update("photo_url", "")}>Remove</Button>
                      </div>
                    ) : (
                      <AssetUploader label="Upload Photo" accept="image/*" maxSizeMB={8} onUploaded={uploadTestimonialPhoto} />
                    )}
                  </div>
                  <div>
                    <Label>Rating</Label>
                    <Select value={String(form.rating || 5)} onValueChange={(v) => update("rating", Number(v))}>
                      <SelectTrigger><SelectValue placeholder="Rating out of 5" /></SelectTrigger>
                      <SelectContent>
                        {[5, 4, 3, 2, 1].map((n) => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select value={form.status} onValueChange={(v) => update("status", v)}>
                      <SelectTrigger><SelectValue placeholder="draft/published" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">draft</SelectItem>
                        <SelectItem value="published">published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button className="bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white" disabled={!canSave} onClick={save}>
                      {editing ? "Save Changes" : "Create Testimonial"}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* TEAM MEMBERS FORM */}
            {collection === "team_members" && (
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <Label>Name</Label>
                    <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Full name" />
                  </div>
                  <div>
                    <Label>Position</Label>
                    <Input value={form.position} onChange={(e) => update("position", e.target.value)} placeholder="Job title" />
                  </div>
                  <div>
                    <Label>Bio</Label>
                    <Textarea rows={6} value={form.bio} onChange={(e) => update("bio", e.target.value)} placeholder="Short biography" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label>Email</Label>
                      <Input value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="email@domain.com" />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="e.g., 0400 123 456" />
                    </div>
                  </div>
                  <div>
                    <Label>LinkedIn URL</Label>
                    <Input value={form.linkedin_url} onChange={(e) => update("linkedin_url", e.target.value)} placeholder="https://linkedin.com/in/..." />
                  </div>
                  <div>
                    <Label>Intro Video URL (YouTube or MP4)</Label>
                    <Input value={form.intro_video_url || ""} onChange={(e) => update("intro_video_url", e.target.value)} placeholder="https://youtu.be/... or https://.../video.mp4" />
                    <p className="text-xs text-gray-500 mt-1">If provided, this video will appear on the profile instead of the photo.</p>
                  </div>
                  <div>
                    <Label>Credentials (comma separated)</Label>
                    <Input
                      value={(form.credentials || []).join(", ")}
                      onChange={(e) => update("credentials", e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                      placeholder="e.g., RE License, MBA, 10+ years experience"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Photo</Label>
                    {form.photo ? (
                      <div className="space-y-2">
                        <img src={form.photo} alt="Team member" className="w-full rounded-lg border object-cover" />
                        <Button variant="outline" onClick={() => update("photo", "")}>Remove</Button>
                      </div>
                    ) : (
                      <AssetUploader label="Upload Photo" accept="image/*" maxSizeMB={8} onUploaded={uploadTeamMemberPhoto} />
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Order</Label>
                      <Input type="number" value={form.order ?? 0} onChange={(e) => update("order", Number(e.target.value))} />
                    </div>
                    <div className="flex items-end gap-3">
                      <div className="space-y-1">
                        <Label>Active</Label>
                        <div className="flex items-center gap-2 h-10">
                          <Switch checked={!!form.active} onCheckedChange={(v) => update("active", v)} />
                          <span className="text-sm text-gray-600">{form.active ? "Yes" : "No"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button className="bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white" disabled={!canSave} onClick={save}>
                      {editing ? "Save Changes" : "Create Team Member"}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* BLOG POSTS FORM (uses BlogEditor) */}
            {collection === "blog_posts" && (
              <div className="px-1">
                <BlogEditor
                  post={editing}
                  onSave={async (data) => {
                    if (editing) {
                      await BlogPost.update(editing.id, data);
                    } else {
                      await BlogPost.create(data);
                    }
                    setOpen(false);
                    setEditing(null);
                    load();
                  }}
                  onCancel={() => {
                    setOpen(false);
                    setEditing(null);
                  }}
                />
              </div>
            )}

            {/* ACQUISITIONS FORM */}
            {collection === "acquisitions" && (
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input value={form.title || ""} onChange={(e) => update("title", e.target.value)} placeholder="e.g., 12 Palm Ave" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <Label>Suburb</Label>
                      <Input value={form.suburb || ""} onChange={(e) => update("suburb", e.target.value)} placeholder="e.g., Byron Bay" />
                    </div>
                    <div>
                      <Label>Region (LGA)</Label>
                      <Select value={form.lga || "Byron Shire"} onValueChange={(v) => update("lga", v)}>
                        <SelectTrigger><SelectValue placeholder="Select region" /></SelectTrigger>
                        <SelectContent>
                          {["Byron Shire", "Tweed Shire", "Ballina Shire", "City of Gold Coast", "Other"].map((r) => (
                            <SelectItem key={r} value={r}>{r}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>State</Label>
                      <Select value={form.state || "NSW"} onValueChange={(v) => update("state", v)}>
                        <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                        <SelectContent>
                          {["NSW", "QLD"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label>Beds</Label>
                      <Input type="number" value={form.beds ?? 0} onChange={(e) => update("beds", Number(e.target.value))} />
                    </div>
                    <div>
                      <Label>Baths</Label>
                      <Input type="number" value={form.baths ?? 0} onChange={(e) => update("baths", Number(e.target.value))} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <Label>Cars</Label>
                      <Input type="number" value={form.cars ?? 0} onChange={(e) => update("cars", Number(e.target.value))} />
                    </div>
                    <div>
                      <Label>Purchase Price (number)</Label>
                      <Input type="number" value={form.purchase_price || ""} onChange={(e) => update("purchase_price", e.target.value)} />
                    </div>
                    <div>
                      <Label>Price Display</Label>
                      <Input value={form.price_display || ""} onChange={(e) => update("price_display", e.target.value)} placeholder="e.g., Undisclosed" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <Label>Land Size</Label>
                      <Input type="number" value={form.land_size || ""} onChange={(e) => update("land_size", e.target.value)} placeholder="e.g., 650" />
                    </div>
                    <div>
                      <Label>Unit</Label>
                      <Select value={form.land_size_unit || "sqm"} onValueChange={(v) => update("land_size_unit", v)}>
                        <SelectTrigger><SelectValue placeholder="Unit" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sqm">sqm</SelectItem>
                          <SelectItem value="acres">acres</SelectItem>
                          <SelectItem value="hectares">hectares</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <Label>Purchase Date</Label>
                      <Input type="date" value={form.purchase_date || ""} onChange={(e) => update("purchase_date", e.target.value)} />
                    </div>
                    <div>
                      <Label>Acquiring Agent</Label>
                      {agents && agents.length > 0 ? (
                        <Select value={form.agent || ""} onValueChange={(v) => update("agent", v)}>
                          <SelectTrigger><SelectValue placeholder="Select agent" /></SelectTrigger>
                          <SelectContent>
                            {agents.map((m) => (
                              <SelectItem key={m.id} value={m.name}>{m.name}</SelectItem>
                            ))}
                            {form.agent && !agents.some((m) => m.name === form.agent) && (
                              <SelectItem value={form.agent}>{form.agent}</SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input value={form.agent || ""} onChange={(e) => update("agent", e.target.value)} placeholder="Type agent name" />
                      )}
                    </div>
                    <div>
                      <Label>On/Off Market</Label>
                      <Select value={form.market_visibility || "on_market"} onValueChange={(v) => update("market_visibility", v)}>
                        <SelectTrigger><SelectValue placeholder="Select visibility" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="on_market">On market</SelectItem>
                          <SelectItem value="off_market">Off market</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Timeframe</Label>
                    <Input value={form.timeframe || ""} onChange={(e) => update("timeframe", e.target.value)} placeholder="e.g., 3 weeks" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Short blurb</Label>
                      <Button 
                        type="button"
                        variant="outline" 
                        size="sm" 
                        onClick={generateExcerpt}
                        disabled={generatingExcerpt || !form.property_type || !form.suburb}
                      >
                        {generatingExcerpt ? "Generating..." : "✨ Generate with AI"}
                      </Button>
                    </div>
                    <Textarea rows={4} value={form.excerpt || ""} onChange={(e) => update("excerpt", e.target.value)} placeholder="1–2 sentences on what's special" />
                  </div>
                  <div>
                    <Label>Realestate.com Link</Label>
                    <Input value={form.realestate_link || ""} onChange={(e) => update("realestate_link", e.target.value)} placeholder="https://www.realestate.com.au/..." />
                  </div>
                  <div>
                    <Label>Tags (comma separated)</Label>
                    <Input
                      value={(form.tags || []).join(", ")}
                      onChange={(e) => update("tags", e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
                      placeholder="e.g., modern, beachfront, investment"
                    />
                  </div>
                  <div>
                    <Label>Slug</Label>
                    <Input value={form.slug || ""} onChange={(e) => update("slug", e.target.value)} placeholder="url-friendly-slug" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Main Image</Label>
                    {form.main_image_url ? (
                      <div className="space-y-2">
                        <img src={form.main_image_url} alt="Property" className="w-full rounded-lg border object-cover" />
                        <Button variant="outline" onClick={() => update("main_image_url", "")}>Remove</Button>
                      </div>
                    ) : (
                      <AssetUploader label="Upload Image" accept="image/*" maxSizeMB={12} onUploaded={uploadAcquisitionImage} />
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Status</Label>
                      <Select value={form.status || "published"} onValueChange={(v) => update("status", v)}>
                        <SelectTrigger><SelectValue placeholder="draft/published" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">draft</SelectItem>
                          <SelectItem value="published">published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end gap-3">
                      <div className="space-y-1">
                        <Label>Featured</Label>
                        <div className="flex items-center gap-2 h-10">
                          <Switch checked={!!form.featured} onCheckedChange={(v) => update("featured", v)} />
                          <span className="text-sm text-gray-600">{form.featured ? "Yes" : "No"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button className="bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white" disabled={!canSave} onClick={save}>
                      {editing ? "Save Changes" : "Create Acquisition"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* URL Import Dialog for Acquisitions (REMOVED) */}

        {/* Enhanced CSV Import Dialog */}
        <Dialog open={showCsvImport} onOpenChange={(open) => { if (!open) resetImport(); }}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto border-[var(--border)]">
            <DialogHeader>
              <DialogTitle>Import Acquisitions from CSV</DialogTitle>
            </DialogHeader>

            {/* Step 1: File Upload */}
            {importStep === 'upload' && (
              <div className="space-y-4">
                <div className="bg-[var(--sea-breeze)]/20 border border-[var(--sea-breeze)] rounded-lg p-4">
                  <h4 className="font-medium mb-2">Supported Formats</h4>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>CSV files with comma, semicolon, tab, or pipe delimiters</li>
                    <li>UTF-8 and ISO-8859-1 text encoding</li>
                    <li>Excel-exported CSV files</li>
                    <li>Files with or without quoted fields</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-3">
                    <strong>Required columns:</strong> Title/Address, Suburb, LGA/Region<br />
                    <strong>Optional columns:</strong> Beds, Baths, Cars, Price, Date, Agent, Type, etc.<br />
                    <strong>Note:</strong> Column names can be flexible - you'll map them in the next step.
                  </p>
                </div>

                <div>
                  <Label htmlFor="csv-file">Select CSV File</Label>
                  <Input
                    id="csv-file"
                    type="file"
                    accept=".csv,.txt,.tsv"
                    onChange={handleFileSelect}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={resetImport}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Column Mapping */}
            {importStep === 'mapping' && csvData && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Map Your CSV Columns</h4>
                  <p className="text-sm text-gray-600">
                    Found <strong>{csvData.headers.length} columns</strong> and <strong>{csvData.rows.length} rows</strong> in your file.
                    {csvData.delimiter && csvData.delimiter !== ',' && (
                      <span className="ml-1">(Detected delimiter: {csvData.delimiter === '\t' ? 'TAB' : csvData.delimiter})</span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Match each column from your CSV to the correct Acquisition field, or select "Ignore" to skip it.
                  </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">📸 About Images</h4>
                  <p className="text-sm text-amber-900">
                    <strong>Images can be added manually after import.</strong> All acquisitions will be created as drafts without images,
                    then you can edit each one to upload or select images from your media library. This is much faster than trying to
                    include image URLs in your CSV file.
                  </p>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left font-medium">Your CSV Column</th>
                        <th className="px-4 py-2 text-left font-medium">Sample Data</th>
                        <th className="px-4 py-2 text-left font-medium">Maps To</th>
                      </tr>
                    </thead>
                    <tbody>
                      {csvData.headers.map((header, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="px-4 py-2 font-medium">{header}</td>
                          <td className="px-4 py-2 text-gray-600 max-w-xs truncate">
                            {csvData.rows[0]?.[header] || '—'}
                          </td>
                          <td className="px-4 py-2">
                            <Select
                              value={columnMapping[header] || 'ignore'}
                              onValueChange={(value) => setColumnMapping({ ...columnMapping, [header]: value })}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select field" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ignore">— Ignore this column —</SelectItem>
                                <SelectItem value="title">Title / Address <span className="text-red-500">*</span></SelectItem>
                                <SelectItem value="main_image_url">Main Image URL (optional)</SelectItem>
                                <SelectItem value="suburb">Suburb <span className="text-red-500">*</span></SelectItem>
                                <SelectItem value="state">State (NSW/QLD)</SelectItem>
                                <SelectItem value="lga">LGA / Region</SelectItem>
                                <SelectItem value="beds">Bedrooms</SelectItem>
                                <SelectItem value="baths">Bathrooms</SelectItem>
                                <SelectItem value="cars">Car Spaces</SelectItem>
                                <SelectItem value="purchase_price">Purchase Price ($)</SelectItem>
                                <SelectItem value="price_display">Price Display Text</SelectItem>
                                <SelectItem value="purchase_date">Purchase Date</SelectItem>
                                <SelectItem value="agent">Agent Name</SelectItem>
                                <SelectItem value="market_visibility">On/Off Market</SelectItem>
                                <SelectItem value="timeframe">Timeframe</SelectItem>
                                <SelectItem value="land_size">Land Size (number)</SelectItem>
                                <SelectItem value="land_size_unit">Land Size Unit (sqm/acres/ha)</SelectItem>
                                <SelectItem value="excerpt">Description/Excerpt</SelectItem>
                                <SelectItem value="tags">Tags (semicolon/comma separated)</SelectItem>
                                <SelectItem value="slug">URL Slug</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                  <strong>Note:</strong> Only <strong>Title</strong> and <strong>Suburb</strong> are required. All other fields can be added or edited after import.
                  All imports will be created as <strong>drafts</strong> for you to review before publishing.
                </div>

                <div className="flex items-center gap-2 py-2">
                  <Switch 
                    checked={autoGenerateExcerpts} 
                    onCheckedChange={setAutoGenerateExcerpts} 
                    id="auto-gen-mode"
                  />
                  <Label htmlFor="auto-gen-mode" className="cursor-pointer">
                    Auto-generate descriptions with AI for items without one (slower)
                  </Label>
                </div>

                <div className="flex justify-between gap-2">
                  <Button variant="outline" onClick={() => setImportStep('upload')}>
                    Back
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      onClick={generatePreview}
                      disabled={!Object.values(columnMapping).some(v => v && v !== 'ignore')}
                      className="bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white"
                    >
                      Review Data &rarr;
                    </Button>
                  </div>
                </div>
                </div>
                )}

                {/* Step 3: Preview */}
                {importStep === 'preview' && (
                <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-700">{previewData.valid.length}</div>
                    <div className="text-sm text-green-800">Ready to Import</div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-700">{previewData.duplicates.length}</div>
                    <div className="text-sm text-yellow-800">Potential Duplicates</div>
                  </div>
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-red-700">{previewData.invalid.length}</div>
                    <div className="text-sm text-red-800">Invalid / Missing Info</div>
                  </div>
                </div>

                {previewData.duplicates.length > 0 && (
                   <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                     <h4 className="font-medium text-yellow-900 mb-2">⚠️ Duplicates Detected</h4>
                     <p className="text-sm text-yellow-800 mb-2">
                       These items match existing Title + Suburb records. They will still be imported if you proceed, but might create duplicates.
                     </p>
                     <div className="max-h-32 overflow-y-auto text-sm bg-white rounded border border-yellow-100 p-2">
                       {previewData.duplicates.map((d, i) => (
                         <div key={i} className="text-gray-600">Row {d._row}: {d.title}, {d.suburb}</div>
                       ))}
                     </div>
                   </div>
                )}

                {previewData.invalid.length > 0 && (
                   <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                     <h4 className="font-medium text-red-900 mb-2">❌ Skipped Rows</h4>
                     <div className="max-h-32 overflow-y-auto text-sm bg-white rounded border border-red-100 p-2">
                       {previewData.invalid.map((d, i) => (
                         <div key={i} className="text-red-600">Row {d._row}: {d._error}</div>
                       ))}
                     </div>
                   </div>
                )}

                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b font-medium text-sm">
                    Preview of Valid Records ({previewData.valid.slice(0,5).length} of {previewData.valid.length})
                  </div>
                  <table className="w-full text-sm">
                    <thead className="bg-white">
                      <tr className="text-left text-gray-500 border-b">
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Suburb</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {previewData.valid.slice(0, 5).map((r, i) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="px-4 py-2">{r.title}</td>
                          <td className="px-4 py-2">{r.suburb}</td>
                          <td className="px-4 py-2 text-gray-500">
                            {r.purchase_price ? `$${r.purchase_price.toLocaleString()}` : '-'}
                          </td>
                          <td className="px-4 py-2 text-gray-500">{r.purchase_date || '-'}</td>
                        </tr>
                        ))}
                    </tbody>
                  </table>
                  {previewData.valid.length > 5 && (
                    <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500 text-center">
                      ...and {previewData.valid.length - 5} more
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 py-2">
                  <Switch 
                    checked={autoGenerateExcerpts} 
                    onCheckedChange={setAutoGenerateExcerpts} 
                    id="auto-gen-mode-preview"
                  />
                  <Label htmlFor="auto-gen-mode-preview" className="cursor-pointer">
                    Auto-generate descriptions with AI (slower)
                  </Label>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setImportStep('mapping')}>
                    Back to Mapping
                  </Button>
                  <Button
                    onClick={executeImport}
                    className="bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white"
                    disabled={importing || (previewData.valid.length === 0 && previewData.duplicates.length === 0)}
                  >
                    {importing ? "Importing..." : `Import ${previewData.valid.length + previewData.duplicates.length} Records`}
                  </Button>
                </div>
                </div>
                )}

                {/* Step 4: Results */}
            {importStep === 'results' && importResults && (
              <div className="space-y-4">
                <div className={`border rounded-lg p-4 ${
                  importResults.failed === 0 ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
                }`}>
                  <h4 className="font-medium mb-3">Import Complete</h4>
                  <div className="space-y-1 text-sm">
                    <div>Total rows processed: <strong>{importResults.total}</strong></div>
                    <div className="text-green-700">Successfully created: <strong>{importResults.created}</strong></div>
                    {importResults.failed > 0 && (
                      <div className="text-red-700">Failed: <strong>{importResults.failed}</strong></div>
                    )}
                  </div>
                </div>

                {importResults.errors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <h4 className="font-medium text-red-900 mb-2">Errors ({importResults.errors.length})</h4>
                    <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                      {importResults.errors.map((err, idx) => (
                        <li key={idx}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Next steps:</strong> All imported acquisitions have been created as <strong>drafts</strong>.
                    Review them in the table below, add any missing images, verify the data, and publish when ready.
                  </p>
                </div>

                <div className="flex justify-end">
                  <Button onClick={resetImport}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
