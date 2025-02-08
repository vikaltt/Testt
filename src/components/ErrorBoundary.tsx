// src/components/ErrorBoundary.tsx

import React, { Component, ErrorInfo } from 'react';

// Этот класс перехватывает ошибки в дочерних компонентах
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    // Обновляем состояние, чтобы отобразить запасной UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Логируем ошибку в консоль или отправляем на сервер
    console.log("Error caught in Error Boundary:", error, errorInfo);
  }

  render() {
    // Если произошла ошибка, показываем запасной UI
    if (this.state.hasError) {
      return <h1>Что-то пошло не так. Пожалуйста, попробуйте позже.</h1>;
    }

    // В остальном, рендерим детей
    return this.props.children;
  }
}

export default ErrorBoundary;
