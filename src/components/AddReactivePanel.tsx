import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

interface AddReactivePanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reactive: any) => void;
}

export default function AddReactivePanel({
  isOpen,
  onClose,
  onSave,
}: AddReactivePanelProps) {
  const [formData, setFormData] = useState({
    name: "",
    expiryDate: "",
    quantity: "",
    unit: "",
    frequency: "",
    standard: "",
    manufactureDate: "",
    receiptDate: "",
    manufacturer: "",
    packageControl: "",
    methodology: "",
    storageLocation: "",
    notes: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    setFormData({
      name: "",
      expiryDate: "",
      quantity: "",
      unit: "",
      frequency: "",
      standard: "",
      manufactureDate: "",
      receiptDate: "",
      manufacturer: "",
      packageControl: "",
      methodology: "",
      storageLocation: "",
      notes: "",
    });
    onClose();
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="w-96 h-full bg-white shadow-2xl border-l border-gray-200">
        <CardHeader className="bg-lab-blue-light/30 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Добавить реактив
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 overflow-y-auto h-[calc(100vh-120px)]">
          <div className="space-y-6">
            {/* Основная информация */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Основная информация
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Название, формула</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Например: Азотная кислота HNO3"
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="quantity">Количество</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) =>
                        handleInputChange("quantity", e.target.value)
                      }
                      placeholder="1"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Ед. изм.</Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("unit", value)
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Выберите" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="литр">литр</SelectItem>
                        <SelectItem value="кг">кг</SelectItem>
                        <SelectItem value="г">г</SelectItem>
                        <SelectItem value="мл">мл</SelectItem>
                        <SelectItem value="шт">шт</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="frequency">Частота реактива</Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("frequency", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Выберите классификацию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Х.Ч">
                        Х.Ч (химически чистый)
                      </SelectItem>
                      <SelectItem value="Ч.Д.А">
                        Ч.Д.А (чистый для анализа)
                      </SelectItem>
                      <SelectItem value="Ч">Ч (чистый)</SelectItem>
                      <SelectItem value="Т.Ч">
                        Т.Ч (технически чистый)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="manufacturer">Производитель</Label>
                  <Input
                    id="manufacturer"
                    value={formData.manufacturer}
                    onChange={(e) =>
                      handleInputChange("manufacturer", e.target.value)
                    }
                    placeholder="Название производителя"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Даты */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Даты</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="manufactureDate">Дата изготовления</Label>
                  <Input
                    id="manufactureDate"
                    type="date"
                    value={formData.manufactureDate}
                    onChange={(e) =>
                      handleInputChange("manufactureDate", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="receiptDate">Дата поступления</Label>
                  <Input
                    id="receiptDate"
                    type="date"
                    value={formData.receiptDate}
                    onChange={(e) =>
                      handleInputChange("receiptDate", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="expiryDate">Срок годности</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) =>
                      handleInputChange("expiryDate", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Дополнительная информация */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Дополнительная информация
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="standard">Стандарт</Label>
                  <Input
                    id="standard"
                    value={formData.standard}
                    onChange={(e) =>
                      handleInputChange("standard", e.target.value)
                    }
                    placeholder="ГОСТ, ТУ и т.д."
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="packageControl">
                    Входной контроль упаковки
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("packageControl", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Состояние упаковки" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Не нарушена">Не нарушена</SelectItem>
                      <SelectItem value="Нарушена">Нарушена</SelectItem>
                      <SelectItem value="Требует проверки">
                        Требует проверки
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="methodology">Методика</Label>
                  <Input
                    id="methodology"
                    value={formData.methodology}
                    onChange={(e) =>
                      handleInputChange("methodology", e.target.value)
                    }
                    placeholder="Методика использования"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="storageLocation">Место хранения</Label>
                  <Input
                    id="storageLocation"
                    value={formData.storageLocation}
                    onChange={(e) =>
                      handleInputChange("storageLocation", e.target.value)
                    }
                    placeholder="Шкаф, полка, помещение"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Примечание</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Дополнительные заметки..."
                    className="mt-1 min-h-[80px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t">
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Отмена
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-lab-blue-dark hover:bg-lab-blue text-white"
            >
              <Icon name="Save" size={16} className="mr-2" />
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
