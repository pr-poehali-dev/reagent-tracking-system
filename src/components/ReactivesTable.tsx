import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "@/components/ui/icon";
import AddReactivePanel from "./AddReactivePanel";

interface Reactive {
  id: number;
  name: string;
  expiryDate: string;
  quantity: number;
  unit: string;
  frequency: string;
  standard: string;
  manufactureDate: string;
  receiptDate: string;
  manufacturer: string;
  packageControl: string;
  methodology: string;
  storageLocation: string;
  notes: string;
}

const mockData: Reactive[] = [
  {
    id: 1,
    name: "Азотная кислота HNO3",
    expiryDate: "2021-09-05",
    quantity: 1,
    unit: "литр",
    frequency: "Х.Ч",
    standard: "",
    manufactureDate: "2021-03-05",
    receiptDate: "2021-04-01",
    manufacturer: "",
    packageControl: "Не нарушена",
    methodology: "",
    storageLocation: "",
    notes: "1 литр",
  },
  {
    id: 2,
    name: "Серная кислота H2SO4",
    expiryDate: "2025-07-01",
    quantity: 1,
    unit: "литр",
    frequency: "Х.Ч",
    standard: "",
    manufactureDate: "2025-01-01",
    receiptDate: "2025-01-01",
    manufacturer: "",
    packageControl: "Не нарушена",
    methodology: "",
    storageLocation: "",
    notes: "литр",
  },
  {
    id: 3,
    name: "Серная кислота H2SO4",
    expiryDate: "2025-07-01",
    quantity: 1,
    unit: "литр",
    frequency: "Х.Ч",
    standard: "",
    manufactureDate: "2025-01-01",
    receiptDate: "2025-01-01",
    manufacturer: "",
    packageControl: "Не нарушена",
    methodology: "",
    storageLocation: "",
    notes: "литр",
  },
];

export default function ReactivesTable() {
  const [reactives, setReactives] = useState<Reactive[]>(mockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [addPanelOpen, setAddPanelOpen] = useState(false);

  const filteredReactives = reactives.filter(
    (reactive) =>
      reactive.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reactive.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const isExpiringSoon = (date: string) => {
    const expiry = new Date(date);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays >= 0;
  };

  const isExpired = (date: string) => {
    const expiry = new Date(date);
    const today = new Date();
    return expiry < today;
  };

  const handleAddReactive = (newReactive: any) => {
    const reactive: Reactive = {
      id: reactives.length + 1,
      name: newReactive.name,
      expiryDate: newReactive.expiryDate,
      quantity: parseInt(newReactive.quantity) || 0,
      unit: newReactive.unit,
      frequency: newReactive.frequency,
      standard: newReactive.standard,
      manufactureDate: newReactive.manufactureDate,
      receiptDate: newReactive.receiptDate,
      manufacturer: newReactive.manufacturer,
      packageControl: newReactive.packageControl,
      methodology: newReactive.methodology,
      storageLocation: newReactive.storageLocation,
      notes: newReactive.notes,
    };
    setReactives((prev) => [...prev, reactive]);
  };

  return (
    <div className="relative">
      {/* Overlay */}
      {addPanelOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-300"
          onClick={() => setAddPanelOpen(false)}
        />
      )}

      <div
        className={`min-h-screen bg-gradient-to-br from-lab-blue-light to-lab-blue p-6 transition-all duration-300 ${
          addPanelOpen ? "mr-96" : ""
        }`}
      >
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center">
                <Icon
                  name="FlaskConical"
                  size={20}
                  className="text-lab-blue-dark"
                />
              </div>
              <span className="text-sm text-gray-600">
                ЛАБОРАТОРНЫЙ ИНСТИТУТ
              </span>
            </div>
            <nav className="flex space-x-6">
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-lab-blue-dark"
              >
                Реактивы
              </Button>
              <Button
                variant="ghost"
                className="text-gray-500 hover:text-lab-blue-dark"
              >
                Прекурсоры
              </Button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
              <Icon name="User" size={20} className="text-lab-blue-dark" />
            </div>
            <Icon name="ChevronDown" size={16} className="text-gray-600" />
          </div>
        </div>

        {/* Main Content */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
          <CardHeader className="bg-lab-blue-light/50 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="bg-white hover:bg-gray-50"
                >
                  <Icon name="Filter" size={16} className="mr-2" />
                  Фильтр
                </Button>
                <div className="relative">
                  <Icon
                    name="Search"
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    placeholder="Поиск"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80 bg-white"
                  />
                </div>
              </div>
              <Button
                className="bg-lab-blue-dark hover:bg-lab-blue text-white"
                onClick={() => setAddPanelOpen(true)}
              >
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить реактив
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/50">
                    <TableHead className="text-xs font-medium text-gray-600 p-4">
                      НАИМЕНОВАНИЕ,
                      <br />
                      ФОРМУЛА
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 p-4">
                      ДАТА
                      <br />
                      ПОСТУПЛЕНИЯ
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 p-4">
                      КЛАССИФИКАЦИЯ
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 p-4">
                      ДАТА
                      <br />
                      ИЗГОТОВЛЕНИЯ
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 p-4">
                      ГОДЕН
                      <br />
                      ДО
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 p-4">
                      ВХОДНОЙ
                      <br />
                      КОНТРОЛЬ
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-600 p-4">
                      ПРИМЕЧАНИЕ
                    </TableHead>
                    <TableHead className="w-12 p-4"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReactives.map((reactive) => (
                    <TableRow key={reactive.id} className="hover:bg-gray-50/50">
                      <TableCell className="p-4">
                        <div className="font-medium text-gray-900">
                          {reactive.name}
                        </div>
                      </TableCell>
                      <TableCell className="p-4 text-gray-600">
                        {reactive.receiptDate}
                      </TableCell>
                      <TableCell className="p-4">
                        <Badge
                          variant="secondary"
                          className="bg-gray-100 text-gray-700"
                        >
                          {reactive.frequency}
                        </Badge>
                      </TableCell>
                      <TableCell className="p-4 text-gray-600">
                        {reactive.manufactureDate}
                      </TableCell>
                      <TableCell className="p-4">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-sm ${
                              isExpired(reactive.expiryDate)
                                ? "text-red-600 font-medium"
                                : isExpiringSoon(reactive.expiryDate)
                                  ? "text-orange-600 font-medium"
                                  : "text-gray-600"
                            }`}
                          >
                            {reactive.expiryDate}
                          </span>
                          {isExpired(reactive.expiryDate) && (
                            <Badge variant="destructive" className="text-xs">
                              Просрочен
                            </Badge>
                          )}
                          {isExpiringSoon(reactive.expiryDate) &&
                            !isExpired(reactive.expiryDate) && (
                              <Badge
                                variant="outline"
                                className="text-xs text-orange-600 border-orange-300"
                              >
                                Истекает
                              </Badge>
                            )}
                        </div>
                      </TableCell>
                      <TableCell className="p-4 text-gray-600">
                        {reactive.packageControl}
                      </TableCell>
                      <TableCell className="p-4 text-gray-600">
                        {reactive.notes}
                      </TableCell>
                      <TableCell className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Icon name="MoreVertical" size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Icon name="Edit" size={14} className="mr-2" />
                              Редактировать
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Icon name="Eye" size={14} className="mr-2" />
                              Подробнее
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Icon name="Trash2" size={14} className="mr-2" />
                              Удалить
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t bg-gray-50/30">
              <div className="text-sm text-gray-600">1-9 из 276</div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Rows per page: 9</span>
                <Button variant="ghost" size="sm">
                  <Icon name="ChevronLeft" size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="ChevronRight" size={16} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AddReactivePanel
        isOpen={addPanelOpen}
        onClose={() => setAddPanelOpen(false)}
        onSave={handleAddReactive}
      />
    </div>
  );
}
