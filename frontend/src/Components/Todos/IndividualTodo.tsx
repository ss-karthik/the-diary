import { useState } from "react";
import { postRequest } from "../../Utils/requests";
import type todoItem from "../../Types/TodoItem";
import { BACKEND_URL } from "../../Utils/constants";
import { Hourglass, CloudCheck } from "lucide-react";

const IndividualTodo = ({
	todo,
	onDelete,
}: {
	todo: todoItem;
	onDelete: (id: number) => void;
}) => {
	const [title, setTitle] = useState(todo.title);
	const [tags, setTags] = useState(todo.tags.join(" "));
	const [priority, setPriority] = useState(todo.priority);
	const [dueDate, setDueDate] = useState(todo.due);
	const [notes, setNotes] = useState(todo.notes);
	const [completed, setCompleted] = useState(todo.completed);
	const [isEditable, setIsEditable] = useState(false);
	const [saving, setSaving] = useState(false);
	const handleDeletion = async () => {
		const data = {
			todoid: todo.id,
		};
		const resp = await postRequest(`${BACKEND_URL}/todos/delete`, data);
		console.log(resp);
		onDelete(todo.id);
	};

	const handleEdit = async () => {
		setSaving(true);
		const tagarr = tags.split(" ");
		const data = {
			title: title,
			tags: tagarr,
			priority: priority,
			due: new Date(dueDate),
			notes: notes,
			completed: completed,
			todoid: todo.id,
		};
		const resp = await postRequest(`${BACKEND_URL}/todos/update`, data);
		console.log(resp);
		setSaving(false);
		setIsEditable(false);
	};

	const handleCompletion = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setSaving(true);
		const tagarr = tags.split(" ");
		const newVal = e.target.checked;
		setCompleted(newVal);
		const data = {
			title: title,
			tags: tagarr,
			priority: priority,
			due: new Date(dueDate),
			notes: notes,
			completed: newVal,
			todoid: todo.id,
		};
		const resp = await postRequest(`${BACKEND_URL}/todos/update`, data);
		console.log(resp);
		setSaving(false);
	};

	const getPriorityColor = (priority: number) => {
		if (priority >= 8) return "text-gruvbox-red bg-gruvbox-dark";
		if (priority >= 5) return "text-gruvbox-orange bg-gruvbox-dark";
		if (priority >= 3) return "text-gruvbox-aqua bg-gruvbox-dark";
		return "text-green-600 bg-green-50";
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	return (
		<div className="bg-gruvbox-mid-l rounded-lg p-6 mb-4 shadow-sm">
			{isEditable ? (
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gruvbox-light mb-1">
							Title
						</label>
						<input
							type="text"
							value={title}
							onChange={(e) => {
								setTitle(e.target.value);
							}}
							className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gruvbox-light mb-1">
								Priority (1-10)
							</label>
							<input
								type="number"
								value={priority}
								onChange={(e) => {
									setPriority(parseInt(e.target.value));
								}}
								min="1"
								max="10"
								className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gruvbox-light mb-1">
								Due Date
							</label>
							<input
								type="date"
								value={dueDate}
								onChange={(e) => {
									setDueDate(e.target.value);
								}}
								className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium text-gruvbox-light mb-1">
							Tags (space separated)
						</label>
						<input
							type="text"
							value={tags}
							onChange={(e) => {
								setTags(e.target.value);
							}}
							placeholder="work urgent personal"
							className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gruvbox-light mb-1">
							Notes
						</label>
						<textarea
							value={notes}
							onChange={(e) => {
								setNotes(e.target.value);
							}}
							rows={3}
							className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
					<button
						onClick={handleEdit}
						className="bg-gruvbox-aqua text-gruvbox-mid-d cursor-pointer  px-4 py-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						Save Changes
					</button>
				</div>
			) : (
				<div className="space-y-3">
					<div className="flex items-start justify-between">
						<h3
							className={`text-lg font-semibold ${completed && "line-through"}`}
						>
							{title}
						</h3>
					</div>
					<div className="flex items-start gap-10 justify-between">
						<span
							className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(priority)}`}
						>
							Priority {priority}
						</span>
						{tags && (
							<div className="flex flex-wrap gap-2">
								{tags
									.split(" ")
									.filter((tag) => tag.trim())
									.map((tag, index) => (
										<span
											key={index}
											className="bg-gruvbox-light text-gruvbox-mid-d px-2 py-1 text-xs rounded-md"
										>
											{tag}
										</span>
									))}
							</div>
						)}
					</div>

					<div className="flex items-center gap-6 text-sm">
						<div className="flex items-center gap-1">
							<span>Due: {formatDate(dueDate)}</span>
						</div>
						<div className="flex items-center gap-1">
							<span>{saving ? <Hourglass /> : <CloudCheck />}</span>
						</div>

						{completed && (
							<div className="flex items-center gap-1 text-gruvbox-green">
								<span>✓</span>
								<span className="font-medium">Completed</span>
							</div>
						)}
					</div>

					{notes && (
						<div className="bg-gruvbox-light p-3 rounded-md">
							<p className="text-sm text-gruvbox-mid-d">{notes}</p>
						</div>
					)}
				</div>
			)}

			<div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
				<div className="flex items-center gap-3">
					<label className="flex items-center gap-2 cursor-pointer">
						<input
							type="checkbox"
							checked={completed}
							onChange={handleCompletion}
							className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
						/>
					</label>
				</div>
				<div className="flex gap-2">
					{!isEditable && (
						<button
							onClick={() => {
								setIsEditable(true);
							}}
							className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 text-sm"
						>
							Edit
						</button>
					)}
					<button
						onClick={handleDeletion}
						className="bg-gruvbox-red  px-3 py-1 text-gruvbox-mid-d rounded-md cursor-pointer focus:outline-none focus:ring-2  text-sm"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default IndividualTodo;
