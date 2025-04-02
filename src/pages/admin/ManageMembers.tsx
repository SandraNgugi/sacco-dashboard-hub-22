
import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Sample member data for demonstration
const initialMembers = [
  {
    id: 1,
    name: "John Kamau",
    membershipNumber: "SCO001",
    email: "john.kamau@example.com",
    phone: "+254 712 345 678",
    joinDate: "Jan 15, 2023",
    status: "active",
  },
  {
    id: 2,
    name: "Mary Wanjiku",
    membershipNumber: "SCO002",
    email: "mary.wanjiku@example.com",
    phone: "+254 723 456 789",
    joinDate: "Feb 20, 2023",
    status: "active",
  },
  {
    id: 3,
    name: "Peter Njoroge",
    membershipNumber: "SCO003",
    email: "peter.njoroge@example.com",
    phone: "+254 734 567 890",
    joinDate: "Mar 5, 2023",
    status: "inactive",
  },
  {
    id: 4,
    name: "Sarah Muthoni",
    membershipNumber: "SCO004",
    email: "sarah.muthoni@example.com",
    phone: "+254 745 678 901",
    joinDate: "Apr 12, 2023",
    status: "active",
  },
  {
    id: 5,
    name: "David Otieno",
    membershipNumber: "SCO007",
    email: "david.otieno@example.com",
    phone: "+254 756 789 012",
    joinDate: "May 8, 2023",
    status: "suspended",
  },
];

export default function ManageMembers() {
  const [members, setMembers] = useState(initialMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "active",
  });
  
  const { toast } = useToast();

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.membershipNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMember = () => {
    const newMember = {
      id: members.length + 1,
      name: formData.name,
      membershipNumber: `SCO00${members.length + 1}`,
      email: formData.email,
      phone: formData.phone,
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: formData.status,
    };

    setMembers([...members, newMember]);
    setIsAddDialogOpen(false);
    resetForm();
    
    toast({
      title: "Member Added",
      description: "New member has been added successfully.",
    });
  };

  const handleEditMember = () => {
    if (!currentMember) return;
    
    const updatedMembers = members.map(member => 
      member.id === currentMember.id ? 
      { 
        ...member, 
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        status: formData.status,
      } : member
    );
    
    setMembers(updatedMembers);
    setIsEditDialogOpen(false);
    resetForm();
    
    toast({
      title: "Member Updated",
      description: "Member details have been updated successfully.",
    });
  };

  const handleDeleteMember = () => {
    if (!currentMember) return;
    
    const updatedMembers = members.filter(member => member.id !== currentMember.id);
    setMembers(updatedMembers);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Member Deleted",
      description: "Member has been removed successfully.",
    });
  };

  const openEditDialog = (member: any) => {
    setCurrentMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      status: member.status,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (member: any) => {
    setCurrentMember(member);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      status: "active",
    });
    setCurrentMember(null);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Manage Members</h1>
            <div className="bg-white rounded-full px-4 py-2 text-sm font-medium text-slate-900 border border-slate-200">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6">
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                <Input
                  placeholder="Search members..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-slate-900 hover:bg-slate-800"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Member
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-medium">Member</TableHead>
                  <TableHead className="font-medium">Membership No.</TableHead>
                  <TableHead className="font-medium">Contact</TableHead>
                  <TableHead className="font-medium">Join Date</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id} className="hover:bg-slate-50">
                    <TableCell>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-medium mr-3">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="font-medium">{member.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{member.membershipNumber}</TableCell>
                    <TableCell>
                      <div>{member.email}</div>
                      <div className="text-sm text-slate-500">{member.phone}</div>
                    </TableCell>
                    <TableCell>{member.joinDate}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${member.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : member.status === 'inactive'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-red-100 text-red-800'
                        }`}>
                        {member.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => openEditDialog(member)}
                          className="h-8 border-slate-200 text-slate-700 hover:bg-slate-100"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openDeleteDialog(member)}
                          className="h-8 border-slate-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200"
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>

      {/* Add Member Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Member</DialogTitle>
            <DialogDescription>
              Enter the details of the new member to add to the system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMember}>
              Add Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Member Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
            <DialogDescription>
              Update the details of the selected member.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="edit-name" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-email" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id="edit-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-phone" className="text-sm font-medium">
                Phone Number
              </label>
              <Input
                id="edit-phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-status" className="text-sm font-medium">
                Status
              </label>
              <select
                id="edit-status"
                name="status"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditMember}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Member Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this member? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentMember && (
              <div className="flex items-center p-4 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-medium mr-4">
                  {currentMember.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium">{currentMember.name}</div>
                  <div className="text-sm text-slate-500">{currentMember.membershipNumber}</div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteMember}>
              Delete Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
