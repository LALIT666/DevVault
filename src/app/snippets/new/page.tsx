import SnippetForm from "@/app/components/SnippetForm";

export default function NewSnippetPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Add New Snippet</h2>
      </div>

      <SnippetForm />
    </div>
  );
}
