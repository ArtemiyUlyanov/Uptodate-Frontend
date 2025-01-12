'use client';

import TopMenu from "@/components/menu/TopMenu";
import ExplorePageContent from "@/containers/explore/ExplorePageContent";
import ExplorePageGreeting from "@/containers/explore/ExplorePageGreeting";
import ExplorePageLayout from "@/layouts/explore/ExplorePageLayout";
import { logout } from "@/store/features/auth/authSlice";
import { RootState } from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar } from '@nextui-org/calendar';
import {parseDate} from "@internationalized/date";
import { Card, CardBody } from "@nextui-org/card";

import {Form, Input, Select, SelectItem, Checkbox, Button} from "@nextui-org/react";

const TestPage = () => {
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
  
    // Real-time password validation
    const getPasswordError = (value: any): any => {
      if (value.length < 4) {
        return "Password must be 4 characters or more";
      }
      if ((value.match(/[A-Z]/g) || []).length < 1) {
        return "Password needs at least 1 uppercase letter";
      }
      if ((value.match(/[^a-z]/gi) || []).length < 1) {
        return "Password needs at least 1 symbol";
      }
  
      return null;
    };
  
    return (
      <Card>
        <CardBody>
          <p>ds</p>
        </CardBody>
      </Card>
    );
}

export default TestPage;